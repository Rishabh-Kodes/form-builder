import { cn } from "../../utils";
import { ButtonProps } from "./button.type";

import styles from "./button.module.scss";

const Button = ({
  children,
  className,
  variant = "primary",
  size = "medium",
  isFullWidth = true,
  isLoading = false,
  isLoadingText = "Loading...",
  isDisabled = false,
  disabled,
  ...props
}: ButtonProps) => {
  const _isDisabled = isDisabled || disabled || isLoading;

  return (
    <button
      className={cn(
        styles["button"],
        size && styles[`button--size-${size}`],
        variant && styles[`button--${variant}`],
        isFullWidth == false && styles["button--no-full-width"],
        className
      )}
      type="button"
      disabled={_isDisabled}
      {...props}
    >
      {isLoading ? isLoadingText : children}
    </button>
  );
};

export default Button;
