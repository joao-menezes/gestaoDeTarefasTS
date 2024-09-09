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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const logger_1 = __importDefault(require("../logger"));
const sequelize_config_1 = __importDefault(require("./sequelize/config/sequelize.config"));
require("./models/associations");
dotenv_1.default.config();
const app = (0, express_1.default)();
let port = parseInt(process.env.PORT || '3000', 10);
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize_config_1.default.authenticate();
        console.log('Database connected successfully');
        // await sequelize.sync({ alter: true });
        yield sequelize_config_1.default.sync({ force: true });
        logger_1.default.info(`Server is running on http://localhost:${port}`);
    }
    catch (error) {
        logger_1.default.error(`Unable to run server: ${error}`);
        process.exit(1);
    }
})).on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        logger_1.default.error(`Port ${port} is already in use. Trying a different port...`);
        port += 1;
        app.listen(port, () => {
            logger_1.default.info(`Server is now running on http://localhost:${port}`);
        });
        return;
    }
    logger_1.default.error(`Server error: ${error}`);
    process.exit(1);
});
