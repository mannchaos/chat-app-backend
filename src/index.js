import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import { dbConnect } from './lib/db.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await dbConnect();

    app.use(express.json());
    app.use('/api/auth', authRoutes);

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
