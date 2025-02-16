import { QuestionType } from "../../shared/types";

export type BuilderContextType = {
  questions: QuestionType[];
  errors: Record<string, string>;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
  handleAddNewQuestions: () => void;
  handleQuestionChange: (index: number, question: QuestionType) => void;
  handleDeleteQuestion: (index: number) => void;
  handleClearQuestions: () => void;
  submitQuestions: () => void;
  loading: boolean;
};

export type BuilderProviderProps = {
  children: React.ReactNode;
};
