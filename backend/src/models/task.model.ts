import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';
import sequelize from "../sequelize/config/sequelize.config";
import UserModel from './user.model';
import {TaskInterface} from "../interfaces/task.interface";

interface TaskCreationAttributes extends Optional<TaskInterface, 'taskId'> {}

class TaskModel extends Model<TaskInterface, TaskCreationAttributes> implements TaskInterface {
  public taskId!: string;
  public title!: string;
  public description!: string;
  public completed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public userId!: ForeignKey<UserModel['userId']>;
}

TaskModel.init(
  {
    taskId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
  }
);

export default TaskModel;
