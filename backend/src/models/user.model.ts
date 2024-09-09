import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize/config/sequelize.config';
import TaskModel from './task.model';
import {UserInterface} from "../interfaces/user.interface";

interface UserCreationAttributes extends Optional<UserInterface, 'userId' | 'tasks' | 'completedTasks'> {}

class UserModel extends Model<UserInterface, UserCreationAttributes> implements UserInterface {
  public userId!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public tasks!: number | null;
  public completedTasks!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly tasksList?: TaskModel[];
}

UserModel.init(
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tasks: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    completedTasks: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export default UserModel;
