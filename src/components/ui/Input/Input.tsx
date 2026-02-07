import { InputHTMLAttributes, ReactNode, forwardRef, useId } from "react";
import { InputProps } from "@/types";
import styles from "./Input.module.css";

interface ExtendedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, InputProps {
  label?: string;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, ExtendedInputProps>(
  (
    { label, variant = "default", size = "md", error, helperText, className = "", id, placeholder, rightElement, ...props },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const containerClasses = [styles.container, styles[variant], styles[size], error && styles.error, className]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [styles.input, label && styles.hasLabel, rightElement && styles.withRightElement]
      .filter(Boolean)
      .join(" ");
    const resolvedPlaceholder = label ? placeholder ?? " " : placeholder;

    return (
      <div className={containerClasses}>
        <div className={styles.inputWrapper}>
          <input ref={ref} id={inputId} placeholder={resolvedPlaceholder} className={inputClasses} {...props} />
          {label && (
            <label className={styles.label} htmlFor={inputId}>
              {label}
            </label>
          )}
          {rightElement && <div className={styles.rightElement}>{rightElement}</div>}
        </div>
        {(error || helperText) && <div className={styles.helperText}>{error || helperText}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";
