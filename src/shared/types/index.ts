import { QuestionTypes, RegexOptions } from "../constants";

export type QuestionType = {
  id: string;
  title: string;
  type: keyof typeof QuestionTypes;
  helperText: string;
  regexType: keyof typeof RegexOptions;
  customRegexPattern?: string;
  options?: { id: string; label: string; value: string }[];
  isRequired?: boolean;
  defaultValue?: string;
};
