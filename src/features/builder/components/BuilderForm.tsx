import { Button } from "../../../components";
import { useBuilderContext } from "../builder.context";
import QuestionForm from "./QuestionForm";

import styles from "../builder.module.scss";

const BuilderForm = () => {
  const { questions, handleAddNewQuestions, submitQuestions, loading } =
    useBuilderContext();

  return (
    <form className={styles["builder"]}>
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
        <Button onClick={submitQuestions} isLoading={loading}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default BuilderForm;
