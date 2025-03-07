import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../components";
import { RegexPatterns, SavedQuestionsKey } from "../../shared/constants";
import { QuestionType } from "../../shared/types";
import InputRenderer from "./components/InputRenderer";

import styles from "./viewer.module.scss";

const Viewer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const questions = useMemo(() => {
    return JSON.parse(localStorage.getItem(SavedQuestionsKey) || "[]");
  }, []);

  const [answers, setAnswers] = useState<{ [key: string]: string }>(
    questions.reduce(
      (acc: { [key: string]: string }, question: QuestionType) => {
        acc[question.id] = question.defaultValue || "";
        return acc;
      },
      {}
    )
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    questions.forEach((question: QuestionType) => {
      if (question.isRequired && !answers[question.id]) {
        newErrors[question.id] = "This field is required.";
      }
      if (question.regexType && question.regexType !== "none") {
        const regexPattern =
          question.regexType === "custom"
            ? question.customRegexPattern
            : RegexPatterns[question.regexType];

        const regex = new RegExp(regexPattern || "");
        if (!regex.test(answers[question.id] || "")) {
          newErrors[question.id] = "Invalid format.";
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (validate()) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAnswers({});
      setErrors({});
      setIsLoading(false);
      toast.success("Submitted answers");
    }
  };

  return (
    <div className={styles["viewer"]}>
      <div className={styles["viewer__container"]}>
        {questions.length > 0 ? (
          <>
            {questions.map((question: QuestionType) => (
              <InputRenderer
                key={question.id}
                type={question.type}
                value={answers[question.id] || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                options={question?.options}
                label={question.title}
                isRequired={question.isRequired}
                helperText={errors[question.id] || question?.helperText}
                state={errors[question.id] ? "error" : "default"}
              />
            ))}
          </>
        ) : (
          <div>No questions found</div>
        )}
      </div>
      <div className={styles["viewer__footer"]}>
        <Button onClick={handleSubmit} isLoading={isLoading}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Viewer;
