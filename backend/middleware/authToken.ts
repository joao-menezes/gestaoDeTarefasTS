import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config()

const secret = String(process.env.JWT_SECRET);

export const authenticateToken = (req: any, res: any, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];


  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
