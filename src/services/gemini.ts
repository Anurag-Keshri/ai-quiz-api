import { GoogleGenerativeAI } from "@google/generative-ai";
import { SchemaType } from "@google/generative-ai";
import { Question } from '../types/question';
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("API key for Gemini is missing. Check your environment variables.");
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
          type: SchemaType.INTEGER,
          description: "The correct answer index for the question",
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
): Promise<Question[]> {

  if (!topic) throw new Error("Topic undefined");
  
  if (numQuestions <= 0 || numOptions <= 0) {
    throw new Error("numQuestions and numOptions must be positive numbers.");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
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
    let parsedQuestions: Question[];

    try {
      parsedQuestions = JSON.parse(questions);
    } catch (error) {
      throw new Error("Error parsing quiz questions JSON: " + (error as Error).message);
    }

    return parsedQuestions;

  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    throw new Error("Error generating quiz questions: " + errMessage);
  }
}
