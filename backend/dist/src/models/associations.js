"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const task_model_1 = __importDefault(require("./task.model"));
user_model_1.default.hasMany(task_model_1.default, {
    sourceKey: 'userId',
    foreignKey: 'userId',
    as: 'tasksList',
});
task_model_1.default.belongsTo(user_model_1.default, {
    foreignKey: 'userId',
    as: 'user',
});
