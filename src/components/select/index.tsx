import { cn } from "../../shared/utils";
import { SelectProps } from "./select.type";

import styles from "./select.module.scss";

const Select = ({
  label,
  state,
  helperText,
  className,
  options,
  isRequired,
  ...props
}: SelectProps) => {
  const containerClassNames = cn(
    styles["select__container"],
    styles[`select__container--${state}`],
    className
  );
  const labelClassNames = cn(
    styles["select__label"],
    styles[`select__label--${state}`]
  );
  const inputClassNames = cn(
    styles["select__control"],
    styles[`select__control--${state}`]
  );
  const helperTextClassNames = cn(
    styles["select__helper-text"],
    styles[`select__helper-text--${state}`]
  );

  return (
    <div className={containerClassNames}>
      {label && (
        <label className={labelClassNames}>
          {label}
          {isRequired && <span className={styles["select__required"]}>*</span>}
        </label>
      )}

      <div className={styles["select__control-container"]}>
        <select className={inputClassNames} {...props}>
          <option value="" hidden>
            Select an option
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {helperText && <p className={helperTextClassNames}>{helperText}</p>}
    </div>
  );
};

export default Select;
export type { SelectProps };
