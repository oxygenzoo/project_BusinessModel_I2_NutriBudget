import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/80 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
