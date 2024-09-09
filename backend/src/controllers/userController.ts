import { Request, Response } from 'express';
import logger from "../../logger";
import HttpCodes from "http-status-codes";
import {SharedErrors} from "../shared/errors/shared-errors";
import UserModel from "../models/user.model";

const _fileName = module.filename.split("/").pop();

export const getUser = async (req: Request, res: Response) => {
  try {
    const users: UserModel[] = await UserModel.findAll();

    if(!users.length) return res.status(HttpCodes.NOT_FOUND).send('No user found.');

    res.json(users);
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
  }
};

export const getUsersFromId = async (req: Request, res: Response) => {
  try {
    const {userId} = req.params;
    const user: UserModel | null = await UserModel.findOne({where: {userId: userId}});

    if(!user) return res.status(HttpCodes.NOT_FOUND).send('No user found.');

    res.json(user);
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(HttpCodes.CREATED).json({user: user.name});
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const [updated] = await UserModel.update(req.body, { where: {userId: userId } });
    if (updated) {
      const updatedUser = await UserModel.findByPk(userId);
      return res.json(updatedUser);
    }

    return res.status(HttpCodes.NOT_FOUND).json({ error: 'User not found' });
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deleted = await UserModel.destroy({ where: { userId: userId } });
    if (deleted) {
      return res.json({
        code: HttpCodes.OK,
        message: `User ${userId} deleted successfully`,
      });
    }

    return res.status(HttpCodes.NOT_FOUND).json({ error: 'User not found' });
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
  }
};
