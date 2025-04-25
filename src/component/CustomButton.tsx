import type React from "react";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

export interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      isLoading = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-teal-500/20 hover:bg-teal-500/30 text-teal-100 border border-teal-400/30 backdrop-blur-sm relative overflow-hidden group",
      secondary:
        "bg-teal-700/30 hover:bg-teal-700/40 text-teal-100 border border-teal-600/30 backdrop-blur-sm",
      outline:
        "bg-transparent hover:bg-teal-800/20 text-teal-200 border border-teal-400/30 backdrop-blur-sm",
      ghost: "bg-transparent hover:bg-teal-800/20 text-teal-200 border-none",
    };

    const sizes = {
      sm: "text-xs py-2 px-3",
      md: "text-sm py-2.5 px-4",
      lg: "text-base py-3 px-6",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "font-sans font-light tracking-wide rounded-sm transition-all duration-300 flex items-center justify-center",
          variants[variant],
          sizes[size],
          fullWidth ? "w-full" : "",
          disabled || isLoading ? "opacity-60 cursor-not-allowed" : "",
          className
        )}
        {...props}
      >
        <span className="absolute inset-0 overflow-hidden rounded-sm">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-0 w-0 rounded-full bg-teal-400/20 transform scale-0 transition-transform duration-500 ease-out group-hover:scale-[6] group-hover:h-56 group-hover:w-56"></span>
        </span>

        <span className="relative flex items-center justify-center gap-2 z-10">
          {icon && iconPosition === "left" && (
            <span className="mr-1">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <motion.span
              className="ml-1"
              animate={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.span>
          )}
        </span>
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
