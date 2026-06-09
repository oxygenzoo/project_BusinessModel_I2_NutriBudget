import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Crown,
  Leaf,
  PiggyBank,
  ShoppingBasket,
  Sparkles,
  Star
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { PublicNav } from "@/components/layout/PublicNav";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { recipes } from "@/data/mockData";

const features = [
  {
    icon: ShoppingBasket,
    title: "Promo-powered meal plans",
    body: "Turn weekly Carrefour, Leclerc, Lidl, Intermarché, and Auchan deals into balanced meals."
  },
  {
    icon: PiggyBank,
    title: "Fintech-style budget tracking",
    body: "Follow daily spend, estimated savings, and food budget momentum from one mobile dashboard."
  },
  {
    icon: BookOpen,
    title: "NutriAcademy",
    body: "Learn proteins, carbs, lipids, labels, and budget nutrition with XP, levels, and streaks."
  }
];

const faqs = [
  ["Is there a backend?", "No. This frontend demo uses local mock data and localStorage only."],
  ["What is free?", "Free users get 5 meal generations per day, basic academy access, and mock ads."],
  ["What does Premium unlock?", "Unlimited meal generations, no ads, advanced analytics, and premium coupons."],
  ["Are coupons real?", "No. Rewards and ads are realistic mock-only examples for the product experience."]
];

export function Landing() {
  return (
    <div className="min-h-screen bg-nutri-background text-slate-950 dark:bg-slate-950 dark:text-white">
      <PublicNav />
      <main>
        <section className="soft-grid overflow-hidden">
          <div className="page-shell grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <Badge tone="lime">Freemium healthy budget assistant</Badge>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal sm:text-6xl lg:text-7xl">
                Eat Better. Spend Less.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
                Generate healthy meals from local supermarket promotions, then learn nutrition through a friendly
                Duolingo-inspired academy.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ChevronRight size={19} />
                  </Button>
                </Link>
                <Link to="/academy">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Discover NutriAcademy
                  </Button>
                </Link>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {[
                  ["50", "promos"],
                  ["30", "recipes"],
                  ["100", "quiz questions"]
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                    <p className="text-2xl font-black text-nutri-secondary">{value}</p>
                    <p className="text-sm font-semibold text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime-300/40 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-green-300/40 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white p-4 shadow-soft dark:bg-slate-900">
                <img
                  src={recipes[3].image}
                  alt="Healthy bowl"
                  className="h-64 w-full rounded-3xl object-cover sm:h-80"
                />
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Card className="shadow-none">
                    <p className="text-sm text-slate-500">Today</p>
                    <p className="text-2xl font-black">8.40€</p>
                  </Card>
                  <Card className="shadow-none">
                    <p className="text-sm text-slate-500">Saved</p>
                    <p className="text-2xl font-black text-nutri-secondary">3.60€</p>
                  </Card>
                  <Card className="shadow-none">
                    <p className="text-sm text-slate-500">XP</p>
                    <p className="text-2xl font-black text-nutri-premium">+120</p>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="page-shell py-16">
          <div className="max-w-2xl">
            <Badge tone="green">Features</Badge>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">A healthier grocery workflow</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title}>
                  <div className="rounded-2xl bg-green-100 p-3 text-nutri-secondary dark:bg-green-500/15">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-4 text-xl font-black">{feature.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{feature.body}</p>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-slate-900">
          <div className="page-shell">
            <Badge tone="lime">How it works</Badge>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["1", "Choose stores", "Pick favorite supermarkets and monthly budget."],
                ["2", "Generate meals", "NutriBudget combines promos, preferences, and nutrition goals."],
                ["3", "Learn and earn", "Complete academy lessons, build streaks, and redeem mock coupons."]
              ].map(([step, title, body]) => (
                <div key={step} className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-950">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-nutri-primary text-xl font-black text-white">
                    {step}
                  </div>
                  <h3 className="mt-4 text-xl font-black">{title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-shell py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Maya", "The shopping list finally makes promotions useful instead of chaotic."],
              ["Jules", "NutriAcademy feels light, but I learned how to compare labels properly."],
              ["Nora", "Premium analytics helped me keep a realistic food budget."]
            ].map(([name, quote]) => (
              <Card key={name}>
                <div className="flex gap-1 text-nutri-premium">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={17} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-slate-700 dark:text-slate-200">"{quote}"</p>
                <p className="mt-4 font-black">{name}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-green-600 to-lime-500 py-16 text-white">
          <div className="page-shell grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <Badge tone="premium">Premium</Badge>
              <h2 className="mt-4 text-4xl font-black">Unlock unlimited healthy savings</h2>
              <p className="mt-3 max-w-2xl text-green-50">
                Remove ads, generate unlimited meal plans, unlock advanced nutrition analytics, and access exclusive mock
                coupons.
              </p>
            </div>
            <Link to="/premium">
              <Button variant="premium" size="lg" className="w-full">
                <Crown size={19} />
                View pricing
              </Button>
            </Link>
          </div>
        </section>

        <section className="page-shell py-16">
          <Badge tone="slate">FAQ</Badge>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <Card key={question}>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 shrink-0 text-nutri-secondary" size={20} />
                  <div>
                    <h3 className="font-black">{question}</h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
