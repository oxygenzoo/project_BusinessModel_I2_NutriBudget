import { NavLink, Outlet } from "react-router-dom";
import {
  BadgeEuro,
  BookOpen,
  Crown,
  Gift,
  Home,
  Leaf,
  ListChecks,
  LogOut,
  Percent,
  Settings,
  ShoppingBasket,
  User
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PremiumBadge } from "@/components/ui/PremiumBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
import { getLevel, getLevelProgress, useAppStore } from "@/store/useAppStore";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Promotions", href: "/promotions", icon: Percent },
  { label: "Meal Planner", href: "/meal-planner", icon: ShoppingBasket },
  { label: "Shopping List", href: "/shopping-list", icon: ListChecks },
  { label: "Academy", href: "/academy", icon: BookOpen },
  { label: "Rewards", href: "/rewards", icon: Gift },
  { label: "Profile", href: "/profile", icon: User }
];

export function AppShell() {
  const user = useAppStore((state) => state.user);
  const isPremium = useAppStore((state) => state.isPremium);
  const logout = useAppStore((state) => state.logout);
  const level = getLevel(user.xp);

  return (
    <div className="min-h-screen bg-nutri-background dark:bg-slate-950">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r bg-white p-4 dark:bg-slate-950 lg:block">
        <div className="flex h-full flex-col">
          <NavLink to="/dashboard" className="flex items-center gap-3 px-2 py-2 text-xl font-black">
            <span className="rounded-2xl bg-nutri-primary p-2 text-white">
              <Leaf size={22} />
            </span>
            NutriBudget
          </NavLink>
          <div className="mt-6 rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">Level {level}</p>
                <p className="font-black">{user.name}</p>
              </div>
              {isPremium ? <PremiumBadge /> : null}
            </div>
            <ProgressBar value={getLevelProgress(user.xp)} className="mt-4" />
            <p className="mt-2 text-xs font-semibold text-slate-500">{user.xp} XP earned</p>
          </div>
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:bg-green-50 hover:text-nutri-secondary dark:text-slate-300 dark:hover:bg-green-950/40",
                      isActive && "bg-green-100 text-nutri-secondary dark:bg-green-500/15 dark:text-green-300"
                    )
                  }
                >
                  <Icon size={19} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <div className="mt-auto space-y-2">
            <NavLink to="/premium">
              <Button variant="premium" className="w-full">
                <Crown size={18} />
                Premium
              </Button>
            </NavLink>
            <Button variant="ghost" className="w-full justify-start" onClick={logout}>
              <LogOut size={18} />
              Log out
            </Button>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur-xl dark:bg-slate-950/90 lg:ml-72">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <NavLink to="/dashboard" className="flex shrink-0 items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-nutri-primary text-white shadow-glow">
                <Leaf size={21} />
              </span>
              <span className="text-lg font-black text-slate-950 dark:text-white">NutriBudget</span>
            </NavLink>
            <div className="hidden border-l pl-3 sm:block">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-nutri-secondary">Healthy fintech</p>
              <h1 className="font-black">Eat better. Spend less.</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-bold dark:bg-slate-900 sm:flex">
              <BadgeEuro size={16} className="text-nutri-secondary" />
              {user.moneySaved.toFixed(0)} saved
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="pb-24 lg:ml-72 lg:pb-8">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 px-2 py-2 backdrop-blur-xl dark:bg-slate-950/95 lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-5 gap-1">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold text-slate-500",
                    isActive && "bg-green-100 text-nutri-secondary dark:bg-green-500/15 dark:text-green-300"
                  )
                }
              >
                <Icon size={18} />
                {item.label.split(" ")[0]}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
