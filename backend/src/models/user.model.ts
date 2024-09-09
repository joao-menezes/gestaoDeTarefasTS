import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize/config/sequelize.config';
import TaskModel from './task.model';

interface UserAttributes {
  userId: number;
  name: string;
  email: string;
  password: string;
  tasks: number | null;
  completedTasks: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'userId' | 'tasks' | 'completedTasks'> {}

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userId!: number;
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
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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

// UserModel.hasMany(TaskModel, {
//   sourceKey: 'id',
//   foreignKey: 'userId',
//   as: 'tasksList', // Alias para facilitar a consulta
// });


export default UserModel;
