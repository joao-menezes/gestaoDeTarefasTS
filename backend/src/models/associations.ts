import UserModel from './user.model';
import TaskModel from './task.model';

UserModel.hasMany(TaskModel, {
  sourceKey: 'userId',
  foreignKey: 'userId',
  as: 'tasksList',
});

TaskModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  as: 'user',
});
