import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpCodes from "http-status-codes";
import UserModel from '../models/user.model';
import dotenv from 'dotenv';
import { SharedErrors } from '../shared/errors/shared-errors';


dotenv.config()

const secret = String(process.env.JWT_SECRET);

console.log(process.env.JWT_SECRET)

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ where: { email } });

    if (existingUser) {
      return res.status(HttpCodes.BAD_REQUEST).json({ error: SharedErrors.UserAlreadyExists });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(HttpCodes.CREATED).json({ message: 'User created successfully', userId: user.userId });
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({ error: SharedErrors.InternalServerError });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(HttpCodes.NOT_FOUND).json({ error: SharedErrors.UserNotFound });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(HttpCodes.UNAUTHORIZED).json({ error: SharedErrors.InvalidCreadintial });
    }

    const token = jwt.sign({ userId: user.userId }, secret, { expiresIn: '1h' });
    res.status(200).json({ token, name: user.name });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
