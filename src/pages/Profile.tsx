import { useState } from "react";
import { Award, Edit3, Flame, PiggyBank, Save, Star, Trophy, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PremiumBadge } from "@/components/ui/PremiumBadge";
import { achievements, supermarkets } from "@/data/mockData";
import { getLevel, getLevelProgress, useAppStore } from "@/store/useAppStore";
import type { Supermarket, UserProfile } from "@/types";

export function Profile() {
  const user = useAppStore((state) => state.user);
  const isPremium = useAppStore((state) => state.isPremium);
  const updateUser = useAppStore((state) => state.updateUser);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<UserProfile>(user);

  const save = () => {
    updateUser(draft);
    setEditing(false);
  };

  const toggleStore = (store: Supermarket) => {
    setDraft((current) => ({
      ...current,
      favoriteStores: current.favoriteStores.includes(store)
        ? current.favoriteStores.filter((item) => item !== store)
        : [...current.favoriteStores, store]
    }));
  };

  const metricValue = (metric: string) => {
    if (metric === "recipes") return user.recipesGenerated;
    if (metric === "streak") return user.streak;
    if (metric === "saved") return user.moneySaved;
    if (metric === "academy") return user.completedLessons.length;
    return 18;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-950 to-green-900 text-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/15">
              <UserRound size={42} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-black">{user.name}</h1>
                {isPremium ? <PremiumBadge /> : null}
              </div>
              <p className="text-slate-300">{user.email}</p>
              <p className="mt-1 font-bold text-nutri-premium">Level {getLevel(user.xp)} · {user.xp} XP</p>
            </div>
          </div>
          <Button variant="premium" onClick={() => (editing ? save() : setEditing(true))}>
            {editing ? <Save size={18} /> : <Edit3 size={18} />}
            {editing ? "Save profile" : "Edit profile"}
          </Button>
        </div>
        <ProgressBar value={getLevelProgress(user.xp)} className="mt-6 bg-white/15" barClassName="bg-nutri-premium" />
      </Card>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["XP", `${user.xp}`, Trophy],
          ["Streak", `${user.streak} days`, Flame],
          ["Saved", `${user.moneySaved.toFixed(0)}€`, PiggyBank],
          ["Achievements", `${user.achievementsUnlocked.length}/20`, Award]
        ].map(([label, value, Icon]) => (
          <Card key={String(label)}>
            <Icon size={24} className="text-nutri-secondary" />
            <p className="mt-3 text-sm font-bold text-slate-500">{String(label)}</p>
            <p className="text-2xl font-black">{String(value)}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <h2 className="text-xl font-black">Profile details</h2>
          {editing ? (
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-bold">Name</span>
                <input
                  className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 outline-none focus:border-nutri-primary dark:bg-slate-950"
                  value={draft.name}
                  onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold">Monthly budget</span>
                <input
                  className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 outline-none focus:border-nutri-primary dark:bg-slate-950"
                  type="number"
                  value={draft.monthlyBudget}
                  onChange={(event) => setDraft((current) => ({ ...current, monthlyBudget: Number(event.target.value) }))}
                />
              </label>
              <div>
                <p className="text-sm font-bold">Favorite stores</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {supermarkets.map((store) => (
                    <button
                      key={store}
                      className={`rounded-full px-3 py-2 text-sm font-bold ${
                        draft.favoriteStores.includes(store)
                          ? "bg-green-100 text-nutri-secondary dark:bg-green-500/15"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                      }`}
                      onClick={() => toggleStore(store)}
                    >
                      {store}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm font-bold text-slate-500">Goal</p>
                <p className="font-black">{user.goal}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm font-bold text-slate-500">Monthly budget</p>
                <p className="font-black">{user.monthlyBudget}€</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-sm font-bold text-slate-500">Favorite stores</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {user.favoriteStores.map((store) => (
                    <Badge key={store} tone="green">
                      {store}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">Achievements</h2>
            <Badge tone="slate">{achievements.length} badges</Badge>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {achievements.slice(0, 12).map((achievement) => {
              const progress = metricValue(achievement.metric);
              const unlocked = user.achievementsUnlocked.includes(achievement.id) || progress >= achievement.target;
              return (
                <div key={achievement.id} className="rounded-2xl border bg-white p-3 dark:bg-slate-950">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-2xl p-2 ${unlocked ? "bg-green-100 text-nutri-secondary dark:bg-green-500/15" : "bg-slate-100 text-slate-400 dark:bg-slate-800"}`}>
                      <Star size={18} fill={unlocked ? "currentColor" : "none"} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-black">{achievement.name}</p>
                      <p className="text-sm text-slate-500">{achievement.description}</p>
                      <ProgressBar value={(progress / achievement.target) * 100} className="mt-3 h-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </div>
  );
}
