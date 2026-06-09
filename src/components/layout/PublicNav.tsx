import { Link, NavLink } from "react-router-dom";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  ["Home", "/"],
  ["Features", "/#features"],
  ["Academy", "/academy"],
  ["Pricing", "/premium"],
  ["Login", "/login"]
];

export function PublicNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <nav className="page-shell flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-black">
          <span className="rounded-2xl bg-nutri-primary p-2 text-white">
            <Leaf size={20} />
          </span>
          NutriBudget
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map(([label, href]) =>
            href.startsWith("/#") ? (
              <a key={label} href={href} className="text-sm font-bold text-slate-600 hover:text-nutri-secondary dark:text-slate-300">
                {label}
              </a>
            ) : (
              <NavLink
                key={label}
                to={href}
                className="text-sm font-bold text-slate-600 hover:text-nutri-secondary dark:text-slate-300"
              >
                {label}
              </NavLink>
            )
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/register" className="hidden sm:block">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
