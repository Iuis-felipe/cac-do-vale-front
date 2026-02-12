export type ButtonVariant = "primary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

export type InputVariant = "default" | "filled" | "outlined";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps {
  variant?: InputVariant;
  size?: InputSize;
  error?: string;
  helperText?: string;
}
