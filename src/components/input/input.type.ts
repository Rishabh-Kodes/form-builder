import { InputHTMLAttributes } from "react";

export type InputProps = {
  label?: string;
  state?: "default" | "error" | "success";
  helperText?: string;
} & InputHTMLAttributes<HTMLInputElement>;
