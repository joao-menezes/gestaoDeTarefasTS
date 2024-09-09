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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsersFromId = exports.getUser = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const shared_errors_1 = require("../shared/errors/shared-errors");
const user_model_1 = __importDefault(require("../models/user.model"));
const _fileName = module.filename.split("/").pop();
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.findAll();
        if (!users.length)
            return res.status(http_status_codes_1.default.NOT_FOUND).send('No user found.');
        res.json(users);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.getUser = getUser;
const getUsersFromId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_model_1.default.findOne({ where: { userId: userId } });
        if (!user)
            return res.status(http_status_codes_1.default.NOT_FOUND).send('No user found.');
        res.json(user);
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.getUsersFromId = getUsersFromId;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.create(req.body);
        res.status(http_status_codes_1.default.CREATED).json({ user: user.name });
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const [updated] = yield user_model_1.default.update(req.body, { where: { userId: userId } });
        if (updated) {
            const updatedUser = yield user_model_1.default.findByPk(userId);
            return res.json(updatedUser);
        }
        return res.status(http_status_codes_1.default.NOT_FOUND).json({ error: 'User not found' });
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const deleted = yield user_model_1.default.destroy({ where: { userId: userId } });
        if (deleted) {
            return res.json({
                code: http_status_codes_1.default.OK,
                message: `User ${userId} deleted successfully`,
            });
        }
        return res.status(http_status_codes_1.default.NOT_FOUND).json({ error: 'User not found' });
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.deleteUser = deleteUser;
