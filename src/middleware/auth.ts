import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');

  const validApiKey = process.env.INTERNAL_API_KEY;


  if (!apiKey || apiKey !== validApiKey) {
    res.status(403).json({
      message: 'Unauthorized: Invalid API Key',
    });
		return;
  }

	next();
};
	