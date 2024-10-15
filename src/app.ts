import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './routes/quiz';
import logger from './logger';
import { auth } from './middleware/auth';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth);

// Routes
app.use('/api/quiz', quizRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
