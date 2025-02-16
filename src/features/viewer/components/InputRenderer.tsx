import React from "react";
import { Input, InputProps, Select, SelectProps } from "../../../components";
import {
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_SELECT,
  INPUT_TYPE_TEXT,
  QuestionTypes,
} from "../../../shared/constants";

type InputRendererProps = {
  type: keyof typeof QuestionTypes;
} & InputProps &
  SelectProps;

const InputRenderer: React.FC<InputRendererProps> = ({
  type: questionType,
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      questionType === INPUT_TYPE_NUMBER &&
      (e.key === "e" || e.key === "E")
    ) {
      e.preventDefault();
    }
  };

  switch (questionType) {
    case INPUT_TYPE_TEXT:
    case INPUT_TYPE_NUMBER:
      return <Input type={questionType} onKeyDown={handleKeyDown} {...props} />;
    case INPUT_TYPE_SELECT:
      return <Select {...props} />;
    default:
      return null;
  }
};

export default InputRenderer;
