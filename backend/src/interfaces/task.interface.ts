import {ForeignKey} from "sequelize";
import UserModel from "../models/user.model";

export interface TaskInterface {
  taskId?: string;
  title: string;
  description: string;
  completed: boolean;
  userId: ForeignKey<UserModel['userId']>;

  createdAt?: Date;
  updatedAt?: Date;
}
