"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const userController_1 = require("../controllers/userController");
const authToken_1 = require("../middleware/authToken");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const router = (0, express_1.Router)();
router.get('/tasks', authToken_1.authenticateToken, taskController_1.getTasks);
router.get('/task/:taskId', taskController_1.getTasksFromId);
router.post('/task', taskController_1.createTask);
router.put('/task/:taskId', taskController_1.updateTask);
router.delete('/task/:taskId', taskController_1.deleteTask);
router.get('/users', userController_1.getUser);
router.get('/user/:userId', userController_1.getUsersFromId);
router.post('/user', userController_1.createUser);
router.put('/user/:userId', userController_1.updateUser);
router.delete('/user/:userId', userController_1.deleteUser);
router.get('/health-check', (req, res) => {
    res.status(http_status_codes_1.default.OK).send('Server is healthy');
});
exports.default = router;
