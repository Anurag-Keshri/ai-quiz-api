import dotenv from 'dotenv';
dotenv.config();

export const config = {
	port: process.env.PORT,
	internalApiKey: process.env.INTERNAL_API_KEY,
	geminiModel: process.env.GEMINI_MODEL,
	geminiApiKey: process.env.GEMINI_API_KEY,
	logLevel: process.env.LOG_LEVEL,
};

const validateConfig = () => {
	for (const key in config) {
		if (!config[key as keyof typeof config]) {
			throw new Error(`Missing configuration value: ${key}`);
		}
	}
};

validateConfig();
