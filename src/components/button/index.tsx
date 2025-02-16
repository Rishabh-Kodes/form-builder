import { cn } from "../../utils";
import { ButtonProps } from "./button.type";

import styles from "./button.module.scss";

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={cn(styles["button"], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
