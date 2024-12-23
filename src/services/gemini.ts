import { GoogleGenerativeAI } from "@google/generative-ai";
import { SchemaType } from "@google/generative-ai";
import { QuizQuestion } from '../types';
import { config } from '../config';
import logger from '../logger'; // Import your logger

const apiKey = config.geminiApiKey;
const geminiModel = config.geminiModel;

if (!apiKey) {
	logger.error("API key for Gemini is missing. Check your environment variables.");
	throw new Error("API key for Gemini is missing. Check your environment variables.");
}

if (!geminiModel) {
	logger.error("Gemini model is missing. Check your environment variables.");
	throw new Error("Gemini model is missing. Check your environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

function generateSchema(numOptions: number) {
	return {
		description: "List of quiz questions",
		type: SchemaType.ARRAY,
		items: {
			type: SchemaType.OBJECT,
			properties: {
				question: {
					type: SchemaType.STRING,
					description: "The quiz question",
					nullable: false,
				},
				options: {
					type: SchemaType.ARRAY,
					description: `List of answer choices, exactly ${numOptions} options`,
					items: {
						type: SchemaType.STRING,
					},
					nullable: false,
				},
				correctAnswer: {
					type: SchemaType.STRING,
					description: "The correct answer for the question",
					nullable: false,
				},
			},
			required: ["question", "options", "correctAnswer"],
		},
	};
}

export async function generateQuestions(
	topic: string,
	numQuestions: number = 5,
	numOptions: number = 4,
	difficulty: string = "medium",
	depth: string = "shallow"
): Promise<QuizQuestion[]> {

	logger.info({ topic, numQuestions, numOptions, difficulty, depth }, 'Generating questions');

	if (!topic) {
		logger.warn("Topic is undefined");
		throw new Error("Topic undefined");
	}

	if (numQuestions <= 0 || numOptions <= 0) {
		logger.warn("Invalid numbers: numQuestions and numOptions must be positive.");
		throw new Error("numQuestions and numOptions must be positive numbers.");
	}

	const model = genAI.getGenerativeModel({
		model: geminiModel as string,
		generationConfig: {
			responseMimeType: "application/json",
			responseSchema: generateSchema(numOptions),
		},
	});

	try {
		const result = await model.generateContent(
			`Generate ${numQuestions} multiple-choice quiz questions about ${topic}. Ensure questions have ${difficulty} difficulty and a ${depth} level of detail.`
		);

		const questions = result.response.text();
		let parsedQuestions: QuizQuestion[];

		try {
			parsedQuestions = JSON.parse(questions);
			logger.info('Successfully generated questions');
		} catch (error) {
			logger.error({ error: (error as Error).message }, 'Error parsing quiz questions JSON');
			throw new Error("Error parsing quiz questions JSON: " + (error as Error).message);
		}

		return parsedQuestions;

	} catch (error) {
		const errMessage = error instanceof Error ? error.message : String(error);
		logger.error({ error: errMessage }, 'Error generating quiz questions');
		throw new Error("Error generating quiz questions: " + errMessage);
	}
}
