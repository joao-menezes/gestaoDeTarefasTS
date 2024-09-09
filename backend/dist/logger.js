"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const winston_1 = __importStar(require("winston"));
const path_1 = __importDefault(require("path"));
const logsDir = path_1.default.join(__dirname, 'logs');
if (!fs_1.default.existsSync(logsDir))
    fs_1.default.mkdirSync(logsDir);
function getLabel() {
    return path_1.default.basename(__filename);
}
const myFormat = winston_1.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level}: ${message})`;
});
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }), winston_1.format.label({ label: getLabel() }), myFormat),
    transports: [
        new winston_1.default.transports.File({
            filename: path_1.default.join(logsDir, 'info.log'),
            level: 'info',
            handleExceptions: true,
            maxsize: 100000000
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join(logsDir, 'error.log'),
            level: 'error',
            handleExceptions: true,
            maxsize: 100000000
        }),
        new winston_1.default.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), myFormat),
            level: 'debug',
            handleExceptions: true,
        }),
    ],
});
exports.default = logger;
