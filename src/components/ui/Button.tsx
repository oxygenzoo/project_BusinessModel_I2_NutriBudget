import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "premium" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-nutri-primary text-white shadow-glow hover:bg-nutri-secondary",
  secondary: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950",
  outline:
    "border border-slate-200 bg-white text-slate-800 hover:border-nutri-primary hover:text-nutri-secondary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
  ghost: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  premium: "bg-nutri-premium text-slate-950 shadow-lg shadow-amber-300/30 hover:bg-amber-300",
  danger: "bg-nutri-danger text-white hover:bg-red-600"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-base"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
