import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "small" | "medium";
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isLoadingText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
