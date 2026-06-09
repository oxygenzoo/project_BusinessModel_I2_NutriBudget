import { Megaphone } from "lucide-react";
import { mockAds } from "@/data/mockData";
import { useAppStore } from "@/store/useAppStore";

export function AdBanner({ placement = 0 }: { placement?: number }) {
  const isPremium = useAppStore((state) => state.isPremium);
  const ad = mockAds[placement % mockAds.length];

  if (isPremium) {
    return null;
  }

  return (
    <aside className="rounded-2xl border border-dashed border-green-300 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-white p-2 text-nutri-secondary dark:bg-slate-900">
            <Megaphone size={20} />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-nutri-secondary">Mock ad</p>
            <h3 className="font-black text-slate-950 dark:text-white">{ad.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {ad.brand}: {ad.body}
            </p>
          </div>
        </div>
        <button className="rounded-full bg-white px-4 py-2 text-sm font-bold text-nutri-secondary shadow-sm dark:bg-slate-900">
          {ad.cta}
        </button>
      </div>
    </aside>
  );
}
