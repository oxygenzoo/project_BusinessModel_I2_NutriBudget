import { Fragment, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Tags } from "lucide-react";
import { NativeAd } from "@/components/ads/NativeAd";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { categories, promotions, supermarkets } from "@/data/mockData";
import type { ProductCategory, Supermarket } from "@/types";

const scoreTone = {
  A: "green",
  B: "lime",
  C: "amber",
  D: "red",
  E: "red"
} as const;

export function Promotions() {
  const [search, setSearch] = useState("");
  const [store, setStore] = useState<"all" | Supermarket>("all");
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [maxPrice, setMaxPrice] = useState(10);

  const filtered = useMemo(
    () =>
      promotions.filter((promotion) => {
        const matchesSearch = promotion.productName.toLowerCase().includes(search.toLowerCase());
        const matchesStore = store === "all" || promotion.supermarket === store;
        const matchesCategory = category === "all" || promotion.category === category;
        const matchesPrice = promotion.discountedPrice <= maxPrice;
        return matchesSearch && matchesStore && matchesCategory && matchesPrice;
      }),
    [category, maxPrice, search, store]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge tone="green">50 promotions</Badge>
          <h1 className="mt-3 text-3xl font-black">Supermarket promotions</h1>
          <p className="mt-1 text-slate-500">Realistic French grocery data, stored locally.</p>
        </div>
        <div className="rounded-2xl bg-green-100 px-4 py-3 text-sm font-black text-nutri-secondary dark:bg-green-500/15">
          {filtered.length} deals found
        </div>
      </div>

      <Card>
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_220px]">
          <label className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-3 dark:bg-slate-950">
            <Search size={18} className="text-slate-400" />
            <input
              className="w-full bg-transparent outline-none"
              placeholder="Search product"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <select
            className="rounded-2xl border bg-white px-3 py-3 outline-none dark:bg-slate-950"
            value={store}
            onChange={(event) => setStore(event.target.value as "all" | Supermarket)}
          >
            <option value="all">All stores</option>
            {supermarkets.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border bg-white px-3 py-3 outline-none dark:bg-slate-950"
            value={category}
            onChange={(event) => setCategory(event.target.value as "all" | ProductCategory)}
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className="rounded-2xl border bg-white px-3 py-2 dark:bg-slate-950">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              <SlidersHorizontal size={14} />
              Max {maxPrice}€
            </span>
            <input
              className="mt-2 w-full accent-nutri-primary"
              type="range"
              min={1}
              max={15}
              step={0.5}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
          </label>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((promotion, index) => (
          <Fragment key={promotion.id}>
            {index === 5 ? <NativeAd key="promo-native-ad" index={2} /> : null}
            <Card className="overflow-hidden p-0">
              <img src={promotion.image} alt={promotion.productName} className="h-44 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-nutri-secondary">{promotion.supermarket}</p>
                    <h2 className="mt-1 text-lg font-black">{promotion.productName}</h2>
                  </div>
                  <Badge tone={scoreTone[promotion.nutritionScore]}>Score {promotion.nutritionScore}</Badge>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-sm text-slate-400 line-through">{promotion.oldPrice.toFixed(2)}€</p>
                    <p className="text-3xl font-black text-slate-950 dark:text-white">{promotion.discountedPrice.toFixed(2)}€</p>
                  </div>
                  <div className="rounded-2xl bg-amber-100 px-3 py-2 text-sm font-black text-amber-700 dark:bg-amber-500/15">
                    -{promotion.discountPercent}%
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {promotion.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500 dark:bg-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Fragment>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center">
          <Tags className="mx-auto text-slate-400" size={34} />
          <h2 className="mt-3 text-xl font-black">No promotions match those filters</h2>
          <p className="text-slate-500">Try increasing the max price or changing supermarket.</p>
        </Card>
      ) : null}
    </div>
  );
}
