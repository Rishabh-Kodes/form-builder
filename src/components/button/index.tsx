import { cn } from "../../utils";
import { ButtonProps } from "./button.type";

import styles from "./button.module.scss";

const Button = ({
  children,
  className,
  variant = "primary",
  size = "medium",
  isFullWidth = true,
  ...props
}: ButtonProps) => {
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
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
