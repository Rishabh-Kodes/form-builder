import { Button, Input } from "../../../components";
import styles from "../builder.module.scss";
import { QuestionType } from "../builder.type";

type QuestionSelectOptionsProps = {
  options: QuestionType["options"];
  handleOptionsChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  addOption: () => void;
};

const QuestionSelectOptions = ({
  options,
  handleOptionsChange,
  addOption,
}: QuestionSelectOptionsProps) => (
  <div className={styles["builder__select-options"]}>
    {options?.map((option, index) => (
      <div className={styles["builder__select-options-item"]} key={option.key}>
        <Input
          label="Key"
          name="key"
          value={option.key}
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

export default QuestionSelectOptions;
