import dotenv from 'dotenv';
dotenv.config();

export const config = {
	port: process.env.PORT,
	internalApiKey: process.env.INTERNAL_API_KEY,
	geminiModel: process.env.GEMINI_MODEL,
	geminiApiKey: process.env.GEMINI_API_KEY,
};

const validateConfig = () => {
	if (!config.internalApiKey) {
		throw new Error('INTERNAL_API_KEY is not set');
	}
	if (!config.port) {
		throw new Error('PORT is not set');
	}
	if (!config.geminiModel) {
		throw new Error('GEMINI_MODEL is not set');
	}
	if (!config.geminiApiKey) {
		throw new Error('GEMINI_API_KEY is not set');
	}
};

validateConfig();
