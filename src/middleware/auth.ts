import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import logger from '../logger';

export const auth = (req: Request, res: Response, next: NextFunction) => {
	const apiKey = req.header('x-api-key');

	const validApiKey = config.internalApiKey;

	if (!apiKey || apiKey !== validApiKey) {
		logger.warn({
			ip: req.ip,
			path: req.path,
			providedApiKey: apiKey, // Optionally log the provided API key (be careful with sensitive data)
		}, 'Unauthorized access attempt: Invalid API key');

		res.status(403).json({
			message: 'Unauthorized: Invalid API Key',
		});
		return;
	}

	logger.info('Authorized access');

	next();
};
