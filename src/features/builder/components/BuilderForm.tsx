import { Button } from "../../../components";
import { useBuilderContext } from "../builder.context";
import QuestionForm from "./QuestionForm";

import styles from "../builder.module.scss";

const BuilderForm = () => {
  const { questions, handleAddNewQuestions } = useBuilderContext();

  return (
    <form className={styles["builder"]}>
      <h1 className={styles["builder__header"]}>Form Builder</h1>
      <div className={styles["builder__container"]}>
        {questions.map((question, index) => (
          <QuestionForm key={question.id} index={index} />
        ))}
        <Button
          variant="secondary"
          size="small"
          onClick={handleAddNewQuestions}
          type="button"
        >
          Add New Question
        </Button>
      </div>
      <div className={styles["builder__footer"]}>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default BuilderForm;
