import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { dbConnect } from './lib/db.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await dbConnect();

    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/auth', authRoutes);
    app.use('/api/message', messageRoutes);

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
