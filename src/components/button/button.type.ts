import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
