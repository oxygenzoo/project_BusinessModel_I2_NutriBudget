import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  BadgeCheck,
  Crown,
  Gift,
  Infinity,
  MegaphoneOff,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { PublicNav } from "@/components/layout/PublicNav";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAppStore } from "@/store/useAppStore";

const benefits = [
  ["No ads", "Remove dashboard, shopping list, and native feed ad placements.", MegaphoneOff],
  ["Unlimited meal generations", "Generate as many meal plans as you want.", Infinity],
  ["Advanced nutrition analytics", "Unlock deeper score trends and insights.", BarChart3],
  ["Personalized recommendations", "Tune suggestions around goals and favorite stores.", Sparkles],
  ["Exclusive coupons", "Access premium-only mock coupons in the rewards store.", Gift],
  ["Premium badge", "Show your upgraded status across the app.", BadgeCheck]
];

export function Premium() {
  const isPremium = useAppStore((state) => state.isPremium);
  const togglePremium = useAppStore((state) => state.togglePremium);

  return (
    <div className="min-h-screen bg-nutri-background dark:bg-slate-950">
      <PublicNav />
      <main>
        <section className="overflow-hidden bg-gradient-to-br from-slate-950 via-green-950 to-green-700 text-white">
          <div className="page-shell grid min-h-[78vh] items-center gap-10 py-16 lg:grid-cols-[1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <Badge tone="premium">NutriBudget Premium</Badge>
              <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl">Unlock NutriBudget Premium</h1>
              <p className="mt-5 max-w-2xl text-lg text-green-50">
                Unlimited meal plans, no ads, advanced analytics, personalized recommendations, exclusive coupons, and a
                premium badge.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="premium" size="lg" onClick={togglePremium}>
                  <Crown size={20} />
                  {isPremium ? "Premium active" : "Start mock subscription"}
                </Button>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="w-full border-white/40 bg-white/10 text-white hover:bg-white/20 sm:w-auto">
                    Open app
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-nutri-secondary">Premium analytics</p>
                  <h2 className="mt-2 text-2xl font-black">Smart basket forecast</h2>
                </div>
                <ShieldCheck className="text-nutri-secondary" size={32} />
              </div>
              <div className="mt-5 grid gap-3">
                {["Unlimited generations", "No advertisement placements", "Premium coupons unlocked"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-green-50 p-4">
                    <BadgeCheck className="text-nutri-secondary" size={20} />
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="page-shell py-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([title, body, Icon]) => (
              <Card key={String(title)}>
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 text-xl font-black">{String(title)}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{String(body)}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-slate-900">
          <div className="page-shell">
            <div className="text-center">
              <Badge tone="premium">Pricing</Badge>
              <h2 className="mt-3 text-4xl font-black">Simple mock pricing</h2>
            </div>
            <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-2xl font-black">Monthly</h3>
                <p className="mt-3 text-5xl font-black">4.99€</p>
                <p className="mt-2 text-slate-500">Flexible monthly access.</p>
                <Button className="mt-6 w-full" variant="outline" onClick={togglePremium}>
                  Choose monthly
                </Button>
              </Card>
              <Card className="relative border-amber-300 p-6">
                <div className="absolute right-5 top-5">
                  <Badge tone="premium">Recommended</Badge>
                </div>
                <h3 className="text-2xl font-black">Yearly</h3>
                <p className="mt-3 text-5xl font-black">39.99€</p>
                <p className="mt-2 text-slate-500">Best value for consistent planning.</p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="mt-6 w-full" variant="premium" onClick={togglePremium}>
                    Choose yearly
                  </Button>
                </motion.div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
