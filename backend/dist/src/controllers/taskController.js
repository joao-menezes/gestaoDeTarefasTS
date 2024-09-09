"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasksFromId = exports.getTasks = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const shared_errors_1 = require("../shared/errors/shared-errors");
const _fileName = module.filename.split("/").pop();
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.default.findAll();
        if (!tasks.length)
            return res.status(http_status_codes_1.default.NOT_FOUND).send('No tasks found.');
        res.json(tasks);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.getTasks = getTasks;
const getTasksFromId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const tasks = yield task_model_1.default.findOne({ where: { taskId: taskId } });
        if (!tasks)
            return res.status(http_status_codes_1.default.NOT_FOUND).send('No tasks found.');
        res.json(tasks);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.getTasksFromId = getTasksFromId;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.create(req.body);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const [updated] = yield task_model_1.default.update(req.body, { where: { taskId: taskId } });
        if (updated) {
            const updatedTask = yield task_model_1.default.findByPk(taskId);
            return res.json(updatedTask);
        }
        return res.status(http_status_codes_1.default.NOT_FOUND).json({ error: 'Task not found' });
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const deleted = yield task_model_1.default.destroy({ where: { taskId: taskId } });
        if (deleted) {
            return res.json({
                code: http_status_codes_1.default.OK,
                message: `Task ${taskId} deleted successfully`,
            });
        }
        return res.status(http_status_codes_1.default.NOT_FOUND).json({ error: 'Task not found' });
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.deleteTask = deleteTask;
