import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "green" | "lime" | "amber" | "red" | "slate" | "premium";

const tones: Record<BadgeTone, string> = {
  green: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  lime: "bg-lime-100 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  red: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  premium: "bg-amber-300 text-slate-950"
};

export function Badge({
  children,
  tone = "green",
  className
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold", tones[tone], className)}>
      {children}
    </span>
  );
}
