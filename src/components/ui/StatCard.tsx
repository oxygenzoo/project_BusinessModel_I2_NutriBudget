import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

export function StatCard({
  title,
  value,
  detail,
  icon
}: {
  title: string;
  value: string;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
      <Card className="h-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{value}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{detail}</p>
          </div>
          <div className="rounded-2xl bg-green-100 p-3 text-nutri-secondary dark:bg-green-500/15 dark:text-green-300">
            {icon}
          </div>
        </div>
        <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-nutri-secondary">
          <ArrowUpRight size={14} />
          Live local data
        </div>
      </Card>
    </motion.div>
  );
}
