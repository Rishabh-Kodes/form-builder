import { useCallback } from "react";
import { Button, Checkbox, Input, Select } from "../../../components";
import {
  INPUT_TYPE_SELECT,
  QuestionTypes,
  RegexOptions,
} from "../../../constants";
import { useBuilderContext } from "../builder.context";
import QuestionSelectOptions from "./QuestionSelectOptions";

import styles from "../builder.module.scss";

const QuestionForm = ({ index }: { index: number }) => {
  const { questions, handleQuestionChange, errors, handleDeleteQuestion } =
    useBuilderContext();
  const question = questions[index];

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleQuestionChange(index, {
        ...question,
        [e.target.name]: e.target.value,
        options: question.type === INPUT_TYPE_SELECT ? [] : question.options,
      });
    },
    [handleQuestionChange, index, question]
  );

  const handleIsRequiredChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleQuestionChange(index, {
        ...question,
        isRequired: e.target.checked,
      });
    },
    [handleQuestionChange, index, question]
  );

  return (
    <div className={styles["builder__question"]}>
      <Input
        label="Question Title"
        name="title"
        value={question.title}
        onChange={handleInputChange}
        isRequired
        helperText={errors[`${index}.title`]}
        state={errors[`${index}.title`] ? "error" : "default"}
      />

      <Select
        label="Question Type"
        id="type"
        name="type"
        value={question.type}
        onChange={handleInputChange}
        options={Object.entries(QuestionTypes).map(([value, label]) => ({
          label,
          value,
        }))}
        helperText={errors[`${index}.type`]}
        state={errors[`${index}.type`] ? "error" : "default"}
      />

      {question.type === INPUT_TYPE_SELECT && (
        <QuestionSelectOptions groupIndex={index} />
      )}
      <Input
        label="Helper Text"
        name="helperText"
        value={question.helperText}
        onChange={handleInputChange}
        helperText={errors[`${index}.helperText`]}
        state={errors[`${index}.helperText`] ? "error" : "default"}
      />
      <label htmlFor="regexType">Regex Validation</label>
      <Select
        id="regexType"
        name="regexType"
        value={question.regexType}
        onChange={handleInputChange}
        options={Object.entries(RegexOptions).map(([value, label]) => ({
          label,
          value,
        }))}
        helperText={errors[`${index}.regexType`]}
        state={errors[`${index}.regexType`] ? "error" : "default"}
      />
      {question.regexType === "custom" && (
        <Input
          label="Custom Regex"
          name="customRegexPattern"
          isRequired
          value={question.customRegexPattern || ""}
          onChange={handleInputChange}
          helperText={errors[`${index}.customRegexPattern`]}
          state={errors[`${index}.customRegexPattern`] ? "error" : "default"}
        />
      )}

      <div className={styles["builder__question-actions"]}>
        <label className={styles["builder__question-action-label"]}>
          Required:
        </label>
        <Checkbox name="isRequired" onChange={handleIsRequiredChange} />
        <span className={styles["builder__question-actions-separator"]} />
        <Button
          variant="secondary"
          size="small"
          isFullWidth={false}
          onClick={() => handleDeleteQuestion(index)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm;
