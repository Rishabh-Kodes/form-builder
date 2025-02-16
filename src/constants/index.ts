import { QuestionType } from "../features/builder/builder.type";

export const TEXT_INPUT = "text";
export const NUMBER_INPUT = "number";
export const SELECT_INPUT = "select";

export const QuestionTypes = {
  [TEXT_INPUT]: "Text",
  [NUMBER_INPUT]: "Number",
  select: "Select",
};

export const RegexOptions = {
  none: "None",
  email: "Email",
  phone: "Phone",
  custom: "Custom",
};

export const RegexPatterns = {
  [RegexOptions.email]: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  [RegexOptions.phone]: "^\\(\\d{3}\\) \\d{3}-\\d{4}$",
};

export const DefaultQuestion: QuestionType = {
  title: "",
  type: TEXT_INPUT,
  isRequired: false,
  helperText: "",
  regexType: RegexOptions.none,
  customRegexPattern: "",
};
