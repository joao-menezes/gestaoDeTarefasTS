import { DataTypes, Model, Optional } from 'sequelize';
import TaskModel from "./task.model";
import sequelize from "../sequelize/config/sequelize.config";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  tasks: number;
  completedTasks: number
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public completedTasks!: number;
  public tasks!: number;
}

UserModel.init({
  id: {
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
  },
  completedTasks: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'users',
});

// User.hasMany(Task, {
//   foreignKey: 'userId',
//   as: 'tasks',
// });

export default UserModel;
