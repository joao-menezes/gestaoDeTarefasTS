import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from "../sequelize/config/sequelize.config";
import UserModel from "./user.model";

interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class TaskModel extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public completed!: boolean;
  public userId!: number;

  public readonly user?: UserModel;
}

TaskModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
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
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  sequelize,
  tableName: 'tasks',
});

TaskModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user',
});

export default TaskModel;
