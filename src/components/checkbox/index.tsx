import { cn } from "../../shared/utils";
import { CheckboxProps } from "./checkbox.type";

import styles from "./checkbox.module.scss";

const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <input
      className={cn(styles["checkbox"], className)}
      type="checkbox"
      {...props}
    />
  );
};

export default Checkbox;
