import { RegexPatterns } from "../../constants";

export type QuestionType = {
  id: string;
  title: string;
  type: string;
  helperText: string;
  regexType: keyof typeof RegexPatterns;
  customRegexPattern?: string;
  options?: { key: string; value: string }[];
  isRequired?: boolean;
};

export type BuilderContextType = {
  questions: QuestionType[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
  handleAddNewQuestions: () => void;
  handleQuestionChange: (index: number, question: QuestionType) => void;
  handleDeleteQuestion: (index: number) => void;
};

export type BuilderProviderProps = {
  children: React.ReactNode;
};
