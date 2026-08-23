import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variantStyles = {
      default: "bg-[#50FA7B] text-[#0A0B10] font-bold hover:bg-[#50FA7B]/90 shadow-[0_0_15px_rgba(80,250,123,0.3)]",
      outline: "border border-[#1e2337] bg-[#141724]/80 text-[#F8F8F2] hover:bg-[#1e2337] hover:border-[#8BE9FD]/50",
      ghost: "hover:bg-[#141724] text-slate-300 hover:text-white"
    };

    const sizeStyles = {
      default: "h-9 px-4 py-2 text-sm rounded-lg",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-xl px-6 text-sm font-semibold"
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant] || variantStyles.default,
      sizeStyles[size] || sizeStyles.default,
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(combinedClassName, (children.props as any)?.className),
        ...props
      });
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
