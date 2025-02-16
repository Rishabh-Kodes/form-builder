import { useCallback } from "react";
import { Button, Checkbox, Input, Select } from "../../../components";
import { QuestionTypes, RegexOptions, SELECT_INPUT } from "../../../constants";
import { useBuilderContext } from "../builder.context";
import QuestionSelectOptions from "./QuestionSelectOptions";

import styles from "../builder.module.scss";

const QuestionForm = ({ index }: { index: number }) => {
  const { questions, handleQuestionChange } = useBuilderContext();
  const question = questions[index];

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleQuestionChange(index, {
        ...question,
        [e.target.name]: e.target.value,
        options: question.type === SELECT_INPUT ? [] : question.options,
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

  const handleOptionsChange = useCallback(
    (optionIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const newOptions = [...(question?.options || [])];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        [e.target.name]: e.target.value,
      };
      handleQuestionChange(index, {
        ...question,
        options: newOptions,
      });
    },
    [handleQuestionChange, question, index]
  );

  const addOption = useCallback(() => {
    handleQuestionChange(index, {
      ...question,
      options: [...(question?.options || []), { key: "", value: "" }],
    });
  }, [handleQuestionChange, index, question]);

  return (
    <div className={styles["builder__question"]}>
      <Input
        label="Question Title"
        name="title"
        value={question.title}
        onChange={handleInputChange}
        isRequired
      />
      <div className={styles["builder__select"]}>
        <label htmlFor="type">Question Type</label>
        <Select
          id="type"
          name="type"
          value={question.type}
          onChange={handleInputChange}
          options={Object.entries(QuestionTypes).map(([value, label]) => ({
            label,
            value,
          }))}
        />
      </div>
      {question.type === SELECT_INPUT && (
        <QuestionSelectOptions
          options={question.options}
          handleOptionsChange={handleOptionsChange}
          addOption={addOption}
        />
      )}
      <Input
        label="Helper Text"
        name="helperText"
        value={question.helperText}
        onChange={handleInputChange}
      />
      <div className={styles["builder__select"]}>
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
        />
        {question.regexType === "custom" && (
          <Input
            label="Custom Regex"
            name="customRegexPattern"
            value={question.customRegexPattern || ""}
            onChange={handleInputChange}
          />
        )}
      </div>

      <div className={styles["builder__question-actions"]}>
        <label className={styles["builder__question-action-label"]}>
          Required:
        </label>
        <Checkbox name="isRequired" onChange={handleIsRequiredChange} />
        <span className={styles["builder__question-actions-separator"]} />
        <Button variant="secondary" size="small" isFullWidth={false}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm;
