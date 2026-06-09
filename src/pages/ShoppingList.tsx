import { Download, ShoppingCart, Trash2 } from "lucide-react";
import { AdBanner } from "@/components/ads/AdBanner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { ProductCategory, ShoppingItem } from "@/types";
import { useAppStore } from "@/store/useAppStore";

const groupOrder: ProductCategory[] = ["Fruits", "Vegetables", "Proteins", "Dairy", "Grains", "Pantry", "Drinks"];

export function ShoppingList() {
  const items = useAppStore((state) => state.shoppingList);
  const toggleItem = useAppStore((state) => state.toggleShoppingItem);
  const clearCheckedItems = useAppStore((state) => state.clearCheckedItems);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = total * 0.18;
  const groups = items.reduce<Record<ProductCategory, ShoppingItem[]>>(
    (acc, item) => {
      acc[item.category].push(item);
      return acc;
    },
    {
      Fruits: [],
      Vegetables: [],
      Proteins: [],
      Dairy: [],
      Grains: [],
      Pantry: [],
      Drinks: []
    }
  );

  const exportList = () => {
    const content = items
      .map((item) => `${item.checked ? "[x]" : "[ ]"} ${item.quantity}x ${item.name} - ${(item.price * item.quantity).toFixed(2)}€`)
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "nutribudget-shopping-list.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-950 to-green-900 text-white">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge tone="lime">Smart list</Badge>
            <h1 className="mt-3 text-3xl font-black">Shopping List</h1>
            <p className="mt-2 text-slate-200">Grouped by aisle with estimated price and savings.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-300">Total</p>
              <p className="text-3xl font-black">{total.toFixed(2)}€</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-300">Savings</p>
              <p className="text-3xl font-black text-nutri-premium">{savings.toFixed(2)}€</p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="premium" onClick={exportList} disabled={items.length === 0}>
            <Download size={18} />
            Export
          </Button>
          <Button variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20" onClick={clearCheckedItems}>
            <Trash2 size={18} />
            Clear checked
          </Button>
        </div>
      </Card>

      {items.length === 0 ? (
        <Card className="text-center">
          <ShoppingCart className="mx-auto text-slate-400" size={42} />
          <h2 className="mt-3 text-2xl font-black">Your list is empty</h2>
          <p className="mt-1 text-slate-500">Add recipes from the meal planner to populate aisle groups.</p>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {groupOrder
            .filter((category) => groups[category].length > 0)
            .map((category) => (
              <Card key={category}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-black">{category}</h2>
                  <Badge tone="slate">{groups[category].length} items</Badge>
                </div>
                <div className="space-y-3">
                  {groups[category].map((item) => (
                    <label
                      key={item.id}
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border bg-white p-3 dark:bg-slate-950"
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5 accent-nutri-primary"
                          checked={item.checked}
                          onChange={() => toggleItem(item.id)}
                        />
                        <span>
                          <span className={`block font-bold ${item.checked ? "text-slate-400 line-through" : ""}`}>
                            {item.quantity}x {item.name}
                          </span>
                          <span className="text-sm text-slate-500">{item.category}</span>
                        </span>
                      </span>
                      <span className="font-black">{(item.price * item.quantity).toFixed(2)}€</span>
                    </label>
                  ))}
                </div>
              </Card>
            ))}
        </div>
      )}

      <AdBanner placement={1} />
    </div>
  );
}
