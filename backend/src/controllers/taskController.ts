import { Request, Response } from 'express';
import TaskModel from '../models/task.model';
import logger from "../../logger";
import HttpCodes from "http-status-codes";
import {SharedErrors} from "../shared/errors/shared-errors";

const _fileName = module.filename.split("/").pop();

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks: TaskModel[] = await TaskModel.findAll();

    if(!tasks.length) return res.status(HttpCodes.NOT_FOUND).send('No tasks found.');

    res.json(tasks);
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
  }
};

export const getTasksFromId = async (req: Request, res: Response) => {
  try {
    const {taskId} = req.params;
    const tasks: TaskModel | null = await TaskModel.findOne({where: {id: taskId}});

    if(!tasks) return res.status(HttpCodes.NOT_FOUND).send('No tasks found.');

    res.json(tasks);
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const [updated] = await TaskModel.update(req.body, { where: {id: taskId } });
    if (updated) {
      const updatedTask = await TaskModel.findByPk(taskId);
      res.json(updatedTask);
    } else {
      res.status(HttpCodes.NOT_FOUND).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const deleted = await TaskModel.destroy({ where: { id: taskId } });
    if (deleted) {
      res.json({
        code: HttpCodes.OK,
        message: `Task ${taskId} deleted successfully`,
      });
    } else {
      res.status(HttpCodes.NOT_FOUND).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({error: SharedErrors.InternalServerError});
  }
};
