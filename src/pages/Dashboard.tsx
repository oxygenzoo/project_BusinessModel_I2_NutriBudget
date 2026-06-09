import { Link } from "react-router-dom";
import {
  BadgeEuro,
  BookOpen,
  Flame,
  PiggyBank,
  Salad,
  ShoppingBasket,
  Sparkles,
  Tags
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AdBanner } from "@/components/ads/AdBanner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { nutritionData, promotions, savingsData } from "@/data/mockData";
import { getLevel, useAppStore } from "@/store/useAppStore";

export function Dashboard() {
  const user = useAppStore((state) => state.user);
  const isPremium = useAppStore((state) => state.isPremium);
  const remaining = useAppStore((state) => state.remainingGenerations());
  const plan = useAppStore((state) => state.activeMealPlan);
  const todayTotal = plan.reduce((sum, recipe) => sum + recipe.price, 0);
  const calories = plan.reduce((sum, recipe) => sum + recipe.calories, 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden bg-gradient-to-br from-green-600 to-lime-500 p-0 text-white">
          <div className="grid gap-4 p-6 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <Badge tone="premium">{isPremium ? "Premium active" : "Free plan"}</Badge>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">Good morning, {user.name.split(" ")[0]}</h2>
              <p className="mt-2 max-w-xl text-green-50">
                You have {isPremium ? "unlimited" : remaining} meal generations left today and {promotions.length} local
                promotions ready to scan.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/meal-planner">
                  <Button variant="secondary">
                    <Sparkles size={18} />
                    Generate meal plan
                  </Button>
                </Link>
                <Link to="/academy">
                  <Button variant="outline" className="border-white/50 bg-white/15 text-white hover:bg-white/25">
                    Start quiz
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-3xl bg-white/15 p-4">
              <p className="text-sm font-bold text-green-50">Current level</p>
              <p className="mt-1 text-6xl font-black">{getLevel(user.xp)}</p>
              <p className="mt-2 text-green-50">{user.xp} XP, {user.streak}-day streak</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">Nutrition score</p>
              <p className="text-3xl font-black">84/100</p>
            </div>
            <Badge tone="green">Balanced</Badge>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={nutritionData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                <Radar dataKey="score" stroke="#16A34A" fill="#22C55E" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Today's budget" value={`${todayTotal.toFixed(2)}€`} detail="Planned basket" icon={<BadgeEuro size={22} />} />
        <StatCard title="Calories" value={`${calories}`} detail="Across 3 meals" icon={<Salad size={22} />} />
        <StatCard title="Money saved" value={`${user.moneySaved.toFixed(0)}€`} detail="Estimated total" icon={<PiggyBank size={22} />} />
        <StatCard title="Promotions" value={`${promotions.length}`} detail="Available now" icon={<Tags size={22} />} />
        <StatCard title="XP earned" value={`${user.xp}`} detail={`${user.streak}-day streak`} icon={<Flame size={22} />} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black">Savings evolution</h2>
              <p className="text-sm text-slate-500">Mock local statistics</p>
            </div>
            <Badge tone="lime">+22%</Badge>
          </div>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="saved" stroke="#22C55E" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="budget" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-black">Quick actions</h2>
          <div className="mt-4 grid gap-3">
            {[
              ["/meal-planner", "Generate meal plan", "Create breakfast, lunch, and dinner from promos.", ShoppingBasket],
              ["/shopping-list", "Open shopping list", "Group ingredients by aisle and price.", BadgeEuro],
              ["/academy", "Start quiz", "Earn XP in NutriAcademy.", BookOpen]
            ].map(([href, title, body, Icon]) => (
              <Link
                key={String(title)}
                to={String(href)}
                className="flex items-center gap-4 rounded-2xl border bg-white p-4 transition hover:border-nutri-primary hover:shadow-sm dark:bg-slate-950"
              >
                <span className="rounded-2xl bg-green-100 p-3 text-nutri-secondary dark:bg-green-500/15">
                  <Icon size={22} />
                </span>
                <span>
                  <span className="block font-black">{String(title)}</span>
                  <span className="text-sm text-slate-500">{String(body)}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-5 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nutritionData}>
                <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="#84CC16" />
                <XAxis dataKey="name" hide />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <AdBanner placement={0} />
    </div>
  );
}
