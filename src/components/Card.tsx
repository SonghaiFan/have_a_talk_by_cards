import { motion, HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "default" | "game" | "question";
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  size = "medium",
  variant = "default",
  className = "",
  ...motionProps
}) => {
  const sizeClasses = {
    small: "w-full max-w-[320px] h-[200px]",
    medium: "w-full max-w-[400px] h-[250px]",
    large: "w-full max-w-[520px] h-[340px]",
  };

  const variantClasses = {
    default: "p-6",
    game: "p-8 flex flex-col justify-between",
    question: "px-14 py-12 flex flex-col justify-center items-center",
  };

  const baseClasses =
    "bg-white shadow-2xl rounded-3xl border-1 border-gray-100";
  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];

  return (
    <motion.div
      className={`${baseClasses} ${sizeClass} ${variantClass} ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default Card;
