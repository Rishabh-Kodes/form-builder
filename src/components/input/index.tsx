import { cn } from "../../shared/utils";
import { InputProps } from "./input.type";

import styles from "./input.module.scss";

const Input = ({
  label,
  state,
  helperText,
  className,
  isRequired,
  ...props
}: InputProps) => {
  const containerClassNames = cn(
    styles["input__container"],
    styles[`input__container--${state}`],
    className
  );
  const labelClassNames = cn(
    styles["input__label"],
    styles[`input__label--${state}`]
  );
  const inputClassNames = cn(
    styles["input__control"],
    styles[`input__control--${state}`]
  );
  const helperTextClassNames = cn(
    styles["input__helper-text"],
    styles[`input__helper-text--${state}`]
  );

  return (
    <div className={containerClassNames}>
      {label && (
        <label className={labelClassNames}>
          {label}
          {isRequired && <span className={styles["input__required"]}>*</span>}
        </label>
      )}
      <input className={inputClassNames} autoCapitalize="off" {...props} />
      {helperText && <p className={helperTextClassNames}>{helperText}</p>}
    </div>
  );
};

export default Input;
export type { InputProps };
