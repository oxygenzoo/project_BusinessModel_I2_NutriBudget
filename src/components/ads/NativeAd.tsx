import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { mockAds } from "@/data/mockData";
import { useAppStore } from "@/store/useAppStore";

export function NativeAd({ index = 0 }: { index?: number }) {
  const isPremium = useAppStore((state) => state.isPremium);
  const ad = mockAds[index % mockAds.length];

  if (isPremium) {
    return null;
  }

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-lime-50 dark:border-green-900 dark:from-green-950 dark:to-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge tone="lime">Sponsored mock</Badge>
          <h3 className="mt-3 text-lg font-black text-slate-950 dark:text-white">{ad.title}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{ad.body}</p>
        </div>
        <button className="rounded-full bg-white px-4 py-2 text-sm font-bold text-nutri-secondary shadow-sm dark:bg-slate-950">
          {ad.cta}
        </button>
      </div>
    </Card>
  );
}
