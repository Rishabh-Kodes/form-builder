import { SelectProps } from "./select.type";
import { cn } from "../../utils";

import styles from "./select.module.scss";

const Select = ({
  label,
  state,
  helperText,
  className,
  options,
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
      <label className={labelClassNames}>{label}</label>
      <select className={inputClassNames} {...props}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p className={helperTextClassNames}>{helperText}</p>
    </div>
  );
};

export default Select;
