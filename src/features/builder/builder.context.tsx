import { createContext, useContext, useEffect, useState } from "react";
import { DefaultQuestion } from "../../constants";
import {
  BuilderContextType,
  BuilderProviderProps,
  QuestionType,
} from "./builder.type";
import { nanoid } from "nanoid";

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider = ({ children }: BuilderProviderProps) => {
  const [questions, setQuestions] = useState<QuestionType[]>(() => {
    const savedQuestions = localStorage.getItem("questions");
    if (savedQuestions) {
      return JSON.parse(savedQuestions);
    }
    const id = nanoid(12);
    return [{ ...DefaultQuestion, id }];
  });

  const handleAddNewQuestions = () => {
    const id = nanoid(12);
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { ...DefaultQuestion, id },
    ]);
  };

  const handleQuestionChange = (index: number, question: QuestionType) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index] = question;
      return newQuestions;
    });
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(index, 1);
      return newQuestions;
    });
  };

  // Autosave questions in localStorage every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Saving questions to localStorage");
      localStorage.setItem("questions", JSON.stringify(questions));
    }, 5000);

    return () => clearInterval(interval);
  }, [questions]);

  return (
    <BuilderContext.Provider
      value={{
        questions,
        setQuestions,
        handleAddNewQuestions,
        handleQuestionChange,
        handleDeleteQuestion,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilderContext must be used within a BuilderProvider");
  }
  return context;
};
