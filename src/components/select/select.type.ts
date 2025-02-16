import { SelectHTMLAttributes } from "react";

export type SelectProps = {
  label?: string;
  state?: "default" | "error" | "success";
  helperText?: string;
  options?: {
    label: string;
    value: string;
  }[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "children">;
