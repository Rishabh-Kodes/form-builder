import { z } from "zod";
import {
  INPUT_TYPE_SELECT,
  REGEX_TYPE_CUSTOM,
  RegexOptions,
  RegexPatterns,
} from "../shared/constants";

const QuestionOptionSchema = z.object({
  id: z.string(),
  label: z.string().min(1, { message: "Label is required" }),
  value: z.string().min(1, { message: "Value is required" }),
});

const QuestionSchema = z
  .object({
    id: z.string(),
    title: z.string().min(1, { message: "Title is required" }),
    type: z.string().min(1, { message: "Type is required" }),
    helperText: z.string().optional(),
    regexType: z.enum(
      Object.keys(RegexOptions) as [keyof typeof RegexOptions],
      {
        message: "Invalid regex type",
      }
    ),
    customRegexPattern: z.string().optional(),
    options: z.array(QuestionOptionSchema).optional(),
    isRequired: z.boolean().optional(),
    defaultValue: z.string().optional(),
  })
  .refine(
    (data) => data.regexType !== REGEX_TYPE_CUSTOM || !!data.customRegexPattern,
    {
      message: "Custom regex pattern is required",
      path: ["customRegexPattern"],
    }
  )
  .refine(
    (data) =>
      data.type !== INPUT_TYPE_SELECT ||
      (data.options && data.options.length > 0),
    {
      message: "Options are required when type is select",
      path: ["options"],
    }
  )
  .refine(
    (data) => {
      if (
        !data.defaultValue ||
        data.type === INPUT_TYPE_SELECT ||
        !data.regexType
      )
        return true;

      const pattern =
        data.regexType === REGEX_TYPE_CUSTOM
          ? data.customRegexPattern
          : RegexPatterns[data.regexType as keyof typeof RegexPatterns];
      return pattern ? new RegExp(pattern).test(data.defaultValue) : true;
    },
    {
      message: "Default value does not match the regex pattern",
      path: ["defaultValue"],
    }
  );

const QuestionsSchema = z.array(QuestionSchema);

export { QuestionsSchema };
