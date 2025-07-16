import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "large";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "default",
  disabled = false,
  className = "",
  ...motionProps
}) => {
  const baseClasses =
    "transition-all duration-300 touch-manipulation min-h-[48px] flex items-center justify-center font-light relative";

  const sizeClasses = {
    default: "px-4 py-1 text-base rounded-2xl",
    large:
      "px-4 sm:px-8 py-2 sm:py-3 text-base sm:text-lg tracking-wide rounded-3xl",
  };

  const variantClasses = {
    primary:
      "bg-slate-900 border-2 border-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 \
      shadow-sm hover:shadow-md hover:scale-105 origin-bottom transform-gpu cursor-pointer \
      disabled:cursor-not-allowed",
    secondary:
      "bg-transparent border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 \
      hover:scale-105 origin-bottom transform-gpu cursor-pointer \
      disabled:cursor-not-allowed",
  };

  const disabledClasses =
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm";

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  return (
    <motion.button
      whileHover={{ y: -1, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      {...motionProps}
      className={combinedClasses}
      disabled={disabled}
    >
      <span className="text-intimate tracking-wide">{children}</span>
    </motion.button>
  );
};

export default Button;
