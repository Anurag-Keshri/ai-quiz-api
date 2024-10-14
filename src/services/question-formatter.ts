import { Question } from '../types/question';

export const formatQuestions = (questions: Question[]) => {
  return questions.map((question) => {
    const formattedOptions = question.options.reduce(
      (acc: any, option: string, index: number) => {
        acc[index] = option;
        return acc;
      },
      {}
    );

    return {
      ...question,
      options: formattedOptions,
    };
  });
};
