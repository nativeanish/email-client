import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center font-sans text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-teal-500/20 hover:bg-teal-500/30 text-teal-100 border border-teal-400/30 backdrop-blur-sm",
        solid:
          "bg-teal-600 hover:bg-teal-700 text-white border border-teal-500/50",
        outline:
          "bg-transparent hover:bg-teal-800/20 text-teal-200 border border-teal-400/30 hover:border-teal-400/50",
        ghost: "bg-transparent hover:bg-teal-800/20 text-teal-200 border-none",
        link: "bg-transparent text-teal-300 hover:text-teal-200 underline-offset-4 hover:underline border-none p-0 h-auto",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-sm",
        sm: "h-8 px-3 rounded-sm text-xs",
        lg: "h-12 px-6 rounded-sm text-base",
        xl: "h-14 px-8 rounded-sm text-lg",
        icon: "h-10 w-10 rounded-full p-0",
      },
      glow: {
        none: "",
        subtle:
          "after:absolute after:inset-0 after:bg-teal-400/10 after:blur-md after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        always:
          "after:absolute after:inset-0 after:bg-teal-400/10 after:blur-md after:animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: "none",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, glow, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Background ripple effect */}
        <span className="absolute inset-0 overflow-hidden rounded-sm">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-0 w-0 rounded-full bg-teal-400/20 transform scale-0 transition-transform duration-500 ease-out group-hover:scale-[6] group-hover:h-56 group-hover:w-56"></span>
        </span>

        {/* Button content */}
        <span className="relative flex items-center justify-center gap-2 z-10">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : leftIcon ? (
            <span className="mr-1">{leftIcon}</span>
          ) : null}

          {children}

          {!isLoading && rightIcon && (
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5">
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton, buttonVariants };
