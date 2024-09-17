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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const shared_errors_1 = require("../shared/errors/shared-errors");
dotenv_1.default.config();
const secret = String(process.env.JWT_SECRET);
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield user_model_1.default.findOne({ where: { email } });
        if (existingUser)
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: shared_errors_1.SharedErrors.UserAlreadyExists });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_model_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(http_status_codes_1.default.CREATED).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({ error: shared_errors_1.SharedErrors.InternalServerError });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(http_status_codes_1.default.NOT_FOUND).json({ error: shared_errors_1.SharedErrors.UserNotFound });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(http_status_codes_1.default.UNAUTHORIZED).json({ error: shared_errors_1.SharedErrors.InvalidCreadintial });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.userId }, secret, { expiresIn: '1h' });
        res.status(200).json({ token, name: user.name });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.login = login;
