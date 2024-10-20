import { QuizQuestion, FormattedQuizQuestion } from '../types';

// Utility function to shuffle an array
const shuffleArray = <T>(array: T[]): T[] => {
  return array
    .map(value => ({ value, sort: Math.random() })) // Assign random sort keys
    .sort((a, b) => a.sort - b.sort)                // Sort by random keys
    .map(({ value }) => value);                     // Extract the shuffled values
};

export const formatQuestions = (questions: QuizQuestion[]): FormattedQuizQuestion[] => {
  return questions
    .filter((question) => question.options.includes(question.correctAnswer)) // Discard if no matching answer
    .map((question) => {
      // Shuffle the options array
      const shuffledOptions = shuffleArray(question.options);

      // Map correctAnswer from string to its index in the shuffled array
      const correctIndex = shuffledOptions.indexOf(question.correctAnswer);

      // Convert options array to an object with index as keys
      const formattedOptions = shuffledOptions.reduce<Record<number, string>>((acc, option, index) => {
        acc[index] = option;
        return acc;
      }, {});

      // Return the formatted question
      return {
        ...question,
        correctAnswer: correctIndex,
        options: formattedOptions,
      };
    });
};
