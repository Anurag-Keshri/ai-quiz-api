import { Router, Request, Response } from 'express';
import { generateQuestions } from '../services/gemini';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

router.post('/generateQuestions', async (req: Request, res: Response) => {
	const topic = req.body.topic;
	const numQuestions = req.body.numQuestions;
	const numOptions = req.body.numOptions;
	const difficulty = req.body.difficulty;
	const depth = req.body.depth;

	try {		
		const questions = await generateQuestions(topic, numQuestions, numOptions, difficulty, depth);
		res.send(questions);
	} catch (error) {
		res.send((error as Error).message);
		console.error(error);
	}

});

export default router;

