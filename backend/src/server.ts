import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import taskRoutes from './routes/routes';
import authRoute from './routes/authRoutes';
import logger from "../logger";
import sequelize from "./sequelize/config/sequelize.config";

dotenv.config();

const app: Application = express();
let port: number = parseInt(process.env.PORT || '3000');

const _fileName = module.filename.split("/").pop();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', taskRoutes);
app.use('/api/auth', authRoute);

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

if(process.env.NODE_ENV !== 'production') {
  app.listen(port, async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connected successfully');
      await sequelize.sync({ alter: true });

      logger.info(`Server is running on http://localhost:${port} - ${_fileName}`);
    } catch (error) {
      logger.error(`Unable to run server: ${error} - ${_fileName}`);
      process.exit(1);
    }
  }).on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      logger.error(`Port ${port} is already in use. Trying a different port...`);
      port += 1;
      app.listen(port, () => {
        logger.info(`Server is now running on http://localhost:${port}`);
      });
    } else {
      logger.error(`Server error: ${error}`);
      process.exit(1);
    }
  });
}
