import { FC } from "react";

interface ISwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Switch: FC<ISwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-10 h-6",
    md: "w-14 h-8",
    lg: "w-16 h-9",
  };

  const toggleClasses = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-8 h-8",
  };

  const translateClasses = {
    sm: checked ? "translate-x-4" : "translate-x-0.5",
    md: checked ? "translate-x-6" : "translate-x-0.5",
    lg: checked ? "translate-x-7" : "translate-x-0.5",
  };

  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        relative inline-flex
        ${sizeClasses[size]}
        rounded-full
        transition-colors duration-300
        ${
          checked
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-300 hover:bg-gray-400"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${className}
      `}
    >
      {/* Toggle circle */}
      <span
        className={`
          ${toggleClasses[size]}
          rounded-full
          bg-white
          shadow-md
          absolute
          top-1/2
          left-0.5
          transform
          -translate-y-1/2
          transition-all duration-300
          ${translateClasses[size]}
          pointer-events-none
        `}
      />
    </button>
  );
};

export default Switch;
