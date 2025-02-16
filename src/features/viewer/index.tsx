import { useMemo, useState } from "react";
import { Button } from "../../components";
import { RegexPatterns, SavedQuestionsKey } from "../../constants";
import { QuestionType } from "../builder/builder.type";

import toast from "react-hot-toast";
import InputRenderer from "./components/InputRenderer";
import styles from "./viewer.module.scss";

const Viewer = () => {
  const questions = useMemo(() => {
    return JSON.parse(localStorage.getItem(SavedQuestionsKey) || "[]");
  }, []);

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
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

  const handleSubmit = () => {
    if (validate()) {
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
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default Viewer;
