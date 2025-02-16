import { nanoid } from "nanoid";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  DefaultQuestion,
  SavedQuestionsKey,
  UnsavedQuestionsKey,
} from "../../constants";
import { QuestionsSchema } from "../../validators/questions.validator";
import {
  BuilderContextType,
  BuilderProviderProps,
  QuestionType,
} from "./builder.type";

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider = ({ children }: BuilderProviderProps) => {
  const [questions, setQuestions] = useState<QuestionType[]>(() => {
    const savedQuestions = localStorage.getItem(UnsavedQuestionsKey);
    if (savedQuestions) {
      return JSON.parse(savedQuestions);
    }
    const id = nanoid(12);
    return [{ ...DefaultQuestion, id }];
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

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

  const saveQuestionsToAPI = (questions: QuestionType[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      const delay = Math.floor(Math.random() * 2000) + 1000; // random delay between 1-3 seconds
      setTimeout(() => {
        try {
          localStorage.setItem("questions", JSON.stringify(questions));
          if (Math.random() < 0.2) {
            throw new Error("Failed to save questions");
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };

  const submitQuestions = async () => {
    setLoading(true);
    const result = QuestionsSchema.safeParse(questions);
    if (!result.success) {
      const errorObject: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        errorObject[issue.path.join(".")] = issue.message;
      });
      setErrors(errorObject);
    } else {
      setErrors({});
      try {
        await saveQuestionsToAPI(questions);
        localStorage.setItem(SavedQuestionsKey, JSON.stringify(questions));
        toast.success("Questions submitted");
      } catch (error) {
        console.error(error);
        toast.error("Error submitting questions");
      }
    }
    setLoading(false);
  };

  // Autosave questions in localStorage every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Saving questions to localStorage");
      localStorage.setItem(UnsavedQuestionsKey, JSON.stringify(questions));
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
        submitQuestions,
        errors,
        loading,
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
