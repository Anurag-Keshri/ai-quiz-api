import { Router, Request, Response } from 'express';
import { generateQuestions } from '../services/gemini';
import { formatQuestions } from '../services/question-formatter';
import logger from '../logger';
import { auth } from '../middleware/auth';

const router = Router();

router.use(auth);

router.get('/ping', (req: Request, res: Response) => {
	logger.info('Request: /quiz/ping');
	res.send('pong');
});

router.post('/generateQuestions', async (req: Request, res: Response) => {
	const { topic, numQuestions, numOptions, difficulty, depth } = req.body;

	logger.info('Request: /quiz/generateQuestions');

	if (!topic) {
		logger.warn('Missing parameters: "topic"');
		res.status(400).send('Missing required parameters: "topic"');
		return;
	}

	try {
		const questions = await generateQuestions(topic, numQuestions, numOptions, difficulty, depth);
		const formattedQuestions = formatQuestions(questions);

		res.send(formattedQuestions);
	} catch (error) {
		logger.error({ error: (error as Error).message }, 'Error generating questions'); 
		res.status(500).send((error as Error).message);
	}
});

export default router;
