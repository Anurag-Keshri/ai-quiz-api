import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './routes/quiz';
import { auth } from './middleware/auth';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(auth);

// Routes
app.use('/api/quiz', quizRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
