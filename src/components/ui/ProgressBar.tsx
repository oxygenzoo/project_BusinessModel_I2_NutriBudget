import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  className,
  barClassName
}: {
  value: number;
  className?: string;
  barClassName?: string;
}) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800", className)}>
      <motion.div
        className={cn("h-full rounded-full bg-nutri-primary", barClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${width}%` }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
      />
    </div>
  );
}
