import { Crown } from "lucide-react";

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-nutri-premium px-2.5 py-1 text-xs font-black text-slate-950">
      <Crown size={13} />
      Premium
    </span>
  );
}
