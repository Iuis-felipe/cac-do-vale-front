import { ButtonHTMLAttributes, forwardRef } from "react";
import { ButtonProps } from "@/types";
import styles from "./Button.module.css";

interface ExtendedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ExtendedButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={buttonClasses} disabled={disabled || loading} {...props}>
        {loading && <span className={styles.spinner} />}
        <span className={loading ? styles.hiddenText : ""}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
