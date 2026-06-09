import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-white py-10 dark:bg-slate-950">
      <div className="page-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-2xl bg-nutri-primary p-2 text-white">
            <Leaf size={20} />
          </div>
          <div>
            <p className="font-black">NutriBudget</p>
            <p className="text-sm text-slate-500">Healthy meals, smarter baskets.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500">
          <a href="/#features">Features</a>
          <a href="/academy">Academy</a>
          <a href="/premium">Pricing</a>
          <a href="/login">Login</a>
        </div>
      </div>
    </footer>
  );
}
