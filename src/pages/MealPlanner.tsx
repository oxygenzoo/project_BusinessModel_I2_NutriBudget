import { useState } from "react";
import { Clock, Flame, Plus, Sparkles, Utensils } from "lucide-react";
import { RewardedAdModal } from "@/components/ads/RewardedAdModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useAppStore } from "@/store/useAppStore";

export function MealPlanner() {
  const [rewardOpen, setRewardOpen] = useState(false);
  const activeMealPlan = useAppStore((state) => state.activeMealPlan);
  const generateMealPlan = useAppStore((state) => state.generateMealPlan);
  const addToShoppingList = useAppStore((state) => state.addToShoppingList);
  const canGenerate = useAppStore((state) => state.canGenerateMealPlan());
  const remaining = useAppStore((state) => state.remainingGenerations());
  const isPremium = useAppStore((state) => state.isPremium);
  const grantRewardedGeneration = useAppStore((state) => state.grantRewardedGeneration);
  const generationCount = useAppStore((state) => state.mealGenerations.count);

  const generate = () => {
    const ok = generateMealPlan();
    if (!ok) {
      setRewardOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-600 to-lime-500 text-white">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Badge tone="premium">{isPremium ? "Unlimited Premium" : "Free quota"}</Badge>
            <h1 className="mt-4 text-3xl font-black">Meal Planner</h1>
            <p className="mt-2 max-w-2xl text-green-50">
              Generate breakfast, lunch, and dinner from the local promo dataset, preferences, and budget targets.
            </p>
            {!isPremium ? (
              <div className="mt-5 max-w-sm">
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span>{generationCount}/5 free generations used</span>
                  <span>{remaining} left</span>
                </div>
                <ProgressBar value={(generationCount / 5) * 100} className="bg-white/20" barClassName="bg-white" />
              </div>
            ) : null}
          </div>
          <Button variant="secondary" size="lg" onClick={generate}>
            <Sparkles size={19} />
            Generate meal plan
          </Button>
        </div>
      </Card>

      {!canGenerate && !isPremium ? (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-black text-amber-800 dark:text-amber-200">Daily free limit reached</h2>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Watch a rewarded mock ad to unlock one extra meal plan today.
              </p>
            </div>
            <Button variant="premium" onClick={() => setRewardOpen(true)}>
              Watch ad
            </Button>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        {activeMealPlan.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden p-0">
            <img src={recipe.image} alt={recipe.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge tone="green">{recipe.mealType}</Badge>
                  <h2 className="mt-3 text-xl font-black">{recipe.name}</h2>
                </div>
                <div className="rounded-2xl bg-green-100 px-3 py-2 text-sm font-black text-nutri-secondary dark:bg-green-500/15">
                  {recipe.price.toFixed(2)}€
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
                  <Flame size={17} className="text-nutri-warning" />
                  <p className="mt-1 font-black">{recipe.calories}</p>
                  <p className="text-slate-500">kcal</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
                  <Clock size={17} className="text-nutri-secondary" />
                  <p className="mt-1 font-black">{recipe.preparationTime}</p>
                  <p className="text-slate-500">min</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
                  <Utensils size={17} className="text-nutri-primary" />
                  <p className="mt-1 font-black">{recipe.protein}g</p>
                  <p className="text-slate-500">protein</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-black">Ingredients</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {recipe.ingredients.map((ingredient) => (
                    <span key={ingredient} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
              <Button className="mt-5 w-full" variant="outline" onClick={() => addToShoppingList(recipe)}>
                <Plus size={18} />
                Add to shopping list
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <RewardedAdModal
        open={rewardOpen}
        onClose={() => setRewardOpen(false)}
        onReward={() => grantRewardedGeneration()}
      />
    </div>
  );
}
