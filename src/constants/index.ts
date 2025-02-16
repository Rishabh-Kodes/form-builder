import { QuestionType } from "../features/builder/builder.type";

export const INPUT_TYPE_TEXT = "text";
export const INPUT_TYPE_NUMBER = "number";
export const INPUT_TYPE_SELECT = "select";

export const REGEX_TYPE_NONE = "none";
export const REGEX_TYPE_EMAIL = "email";
export const REGEX_TYPE_PHONE = "phone";
export const REGEX_TYPE_CUSTOM = "custom";

export const QuestionTypes = {
  [INPUT_TYPE_TEXT]: "Text",
  [INPUT_TYPE_NUMBER]: "Number",
  [INPUT_TYPE_SELECT]: "Select",
};

export const RegexOptions = {
  [REGEX_TYPE_NONE]: "None",
  [REGEX_TYPE_EMAIL]: "Email",
  [REGEX_TYPE_PHONE]: "Phone",
  [REGEX_TYPE_CUSTOM]: "Custom",
};

export const RegexPatterns = {
  [REGEX_TYPE_EMAIL]: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  [REGEX_TYPE_PHONE]: "^\\(\\d{3}\\) \\d{3}-\\d{4}$",
};

export const DefaultQuestion: QuestionType = {
  id: "",
  title: "",
  type: INPUT_TYPE_TEXT,
  isRequired: false,
  helperText: "",
  regexType: REGEX_TYPE_NONE,
  customRegexPattern: "",
};

export const UnsavedQuestionsKey = "unsaved_questions";
export const SavedQuestionsKey = "questions";
