export type QuizQuestion = {
  correctAnswer: string;
  options: string[];
  question: string;
};

export type FormattedQuizQuestion = {
  question: string;
  options: Record<number, string>;  
  correctAnswer: number;  
};