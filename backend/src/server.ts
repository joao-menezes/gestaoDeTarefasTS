import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import taskRoutes from './routes/routes';
import authRoute from './routes/authRoutes';
import logger from "../logger";
import sequelize from "./sequelize/config/sequelize.config";
import './models/associations';
import {setupSwagger} from "../config/swaggerConfig";
dotenv.config();

const app: Application = express();
let port: number = parseInt(process.env.PORT || '3000', 10) ;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

app.use('/api', taskRoutes);
app.use('/api/auth', authRoute);

setupSwagger(app);

app.listen(port, () => {
  sequelize.authenticate()
    .then(async () => {
      console.log('Database connected successfully');
      return sequelize.sync({ alter: true });
    })
    .then(() => {
      // await sequelize.sync({ force: true });
      logger.info(`Server is running on http://localhost:${port}`);
    })
    .catch((error) => {
      logger.error(`Unable to run server: ${error}`);
      process.exit(1);
    });
}).on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${port} is already in use. Trying a different port...`);
    port += 1;
    app.listen(port, () => {
      logger.info(`Server is now running on http://localhost:${port}`);
    });
    return;
  }
  logger.error(`Server error: ${error}`);
  process.exit(1);
});
