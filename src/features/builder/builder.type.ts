import { QuestionTypes, RegexOptions } from "../../constants";

export type QuestionType = {
  id: string;
  title: string;
  type: keyof typeof QuestionTypes;
  helperText: string;
  regexType: keyof typeof RegexOptions;
  customRegexPattern?: string;
  options?: { id: string; label: string; value: string }[];
  isRequired?: boolean;
};

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
