import { useCallback } from "react";
import { Button, Input } from "../../../components";
import { useBuilderContext } from "../builder.context";
import styles from "../builder.module.scss";
import { nanoid } from "nanoid";

type QuestionSelectOptionsProps = {
  groupIndex: number;
};

const QuestionSelectOptions = ({ groupIndex }: QuestionSelectOptionsProps) => {
  const { questions, errors, handleQuestionChange } = useBuilderContext();
  const question = questions[groupIndex];
  const options = question?.options || [];
  const error = errors[`${groupIndex}.options`];

  const handleOptionsChange = useCallback(
    (optionIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const newOptions = [...(question?.options || [])];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        [e.target.name]: e.target.value,
      };
      handleQuestionChange(groupIndex, {
        ...question,
        options: newOptions,
      });
    },
    [handleQuestionChange, question, groupIndex]
  );

  const addOption = useCallback(() => {
    handleQuestionChange(groupIndex, {
      ...question,
      options: [
        ...(question?.options || []),
        { id: nanoid(12), label: "", value: "" },
      ],
    });
  }, [handleQuestionChange, groupIndex, question]);

  return (
    <div className={styles["builder__select-options"]}>
      {options?.map((option, index) => (
        <div className={styles["builder__select-options-item"]} key={option.id}>
          <Input
            label="Label"
            name="label"
            value={option.label}
            onChange={(e) => handleOptionsChange(index, e)}
          />
          <Input
            label="Value"
            name="value"
            value={option.value}
            onChange={(e) => handleOptionsChange(index, e)}
          />
        </div>
      ))}
      {error && (
        <div className={styles["builder__select-options-error"]}>{error}</div>
      )}
      <Button
        variant="secondary"
        size="small"
        className={styles["builder__select-options-button"]}
        onClick={addOption}
      >
        Add Option
      </Button>
    </div>
  );
};

export default QuestionSelectOptions;
