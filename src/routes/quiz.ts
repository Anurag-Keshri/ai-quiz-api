import { Router, Request, Response } from 'express';
import { generateQuestions } from '../services/gemini';
import { formatQuestions } from '../services/question-formatter';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
	res.send('pong');
});

router.post('/generateQuestions', async (req: Request, res: Response) => {
	const { topic, numQuestions, numOptions, difficulty, depth } = req.body;

	if (!topic) {
		res.status(400).send('Missing required parameters: "topic"');
		return;
	}

	try {
		const questions = await generateQuestions(topic, numQuestions, numOptions, difficulty, depth);
		const formattedQuestions = formatQuestions(questions);
		res.send(formattedQuestions);
	} catch (error) {
		console.error(error);
		res.status(500).send((error as Error).message);
	}
});

export default router;

