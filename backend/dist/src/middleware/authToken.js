"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = String(process.env.JWT_SECRET);
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
