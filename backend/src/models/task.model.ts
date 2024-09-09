import { DataTypes, ForeignKey, Model, Optional } from 'sequelize';
import sequelize from "../sequelize/config/sequelize.config";
import UserModel from './user.model';


interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: ForeignKey<UserModel['id']>;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class TaskModel extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public userId!: ForeignKey<UserModel['id']>;
}

TaskModel.init(
  {
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
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
  }
);

// TaskModel.belongsTo(UserModel, {
//   foreignKey: 'userId',
//   as: 'user',
// });

export default TaskModel;
