# AI Quiz API

This project is the backend service for the **AI-Powered Quiz Generation Web Application**, which generates multiple-choice questions (MCQs) using various GenAI services based on user input. The API allows users to select the AI service they prefer and pass the necessary parameters to generate quizzes.

## Project Overview

The **AI Quiz API** is built using Node.js, Express, and TypeScript. It supports multiple AI services (e.g., Google AI Studio, OpenAI) for generating questions and can be extended to support additional AI providers in the future.

## Features

- **AI-Driven Quiz Generation**: Users can generate quiz questions based on a topic, difficulty, and other settings.
- **Flexible AI Provider Selection**: Users can choose which GenAI service to use for question generation.
- **Service Extensibility**: Easily add new AI services by implementing the common interface.

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **AI Services**: Google AI Studio, OpenAI (other services can be added)
- **Authentication**: API key-based authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Anurag-Keshri/ai-quiz-api.git
   cd ai-quiz-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following values:

   ```bash
   GEN_AI_API_KEY=your-google-ai-api-key
   GEN_AI_API_URL=your-google-ai-api-url
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Compile TypeScript:

   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Usage

- **Endpoint**: `/generate`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "serviceName": "google", // or "openai"
    "topic": "Artificial Intelligence",
    "options": {
      "difficulty": "medium",
      "numQuestions": 5
    }
  }
  ```
