import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../components";
import { SavedQuestionsKey } from "../../shared/constants";
import Builder from "../builder";
import Viewer from "../viewer";

import styles from "./app.module.scss";

const App = () => {
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    const existingQuestions = localStorage.getItem(SavedQuestionsKey);
    if (existingQuestions) {
      setShowPreview(!showPreview);
    } else {
      toast.error("Unsaved questions found");
    }
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["layout__header"]}>
        <h1 className={styles["layout__header-title"]}>Form Builder</h1>
        <Button onClick={handlePreview} isFullWidth={false}>
          {showPreview ? "Edit" : "Preview"}
        </Button>
      </div>
      <div className={styles["layout__body"]}>
        {showPreview ? <Viewer /> : <Builder />}
      </div>
    </div>
  );
};

export default App;
