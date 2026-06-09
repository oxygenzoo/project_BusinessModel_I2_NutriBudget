import { FormEvent, ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Lock, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAppStore } from "@/store/useAppStore";

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-nutri-background dark:bg-slate-950 lg:grid-cols-[1fr_0.9fr]">
      <section className="hidden bg-gradient-to-br from-green-600 to-lime-400 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-black">
          <span className="rounded-2xl bg-white/20 p-2">
            <Leaf size={22} />
          </span>
          NutriBudget
        </Link>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-green-100">Mock authentication</p>
          <h1 className="mt-4 max-w-xl text-5xl font-black leading-tight">
            Your healthy budget starts with one tiny form.
          </h1>
        </div>
      </section>
      <section className="flex min-h-screen items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-black lg:hidden">
              <span className="rounded-2xl bg-nutri-primary p-2 text-white">
                <Leaf size={20} />
              </span>
              NutriBudget
            </Link>
            <ThemeToggle />
          </div>
          <Card className="p-6">
            <h1 className="text-3xl font-black">{title}</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{subtitle}</p>
            {children}
          </Card>
        </motion.div>
      </section>
    </div>
  );
}

export function Login() {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);
  const [email, setEmail] = useState("camille@nutribudget.app");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email);
    navigate(onboardingCompleted ? "/dashboard" : "/onboarding");
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in with any email to enter the mock app.">
      <form className="mt-6 space-y-4" onSubmit={submit}>
        <label className="block">
          <span className="text-sm font-bold">Email</span>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border bg-white px-3 py-3 dark:bg-slate-950">
            <Mail size={18} className="text-slate-400" />
            <input
              className="w-full bg-transparent outline-none"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-bold">Password</span>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border bg-white px-3 py-3 dark:bg-slate-950">
            <Lock size={18} className="text-slate-400" />
            <input className="w-full bg-transparent outline-none" defaultValue="nutribudget" type="password" required />
          </div>
        </label>
        <div className="flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="font-bold text-nutri-secondary">
            Forgot password?
          </Link>
          <Link to="/register" className="font-bold text-slate-500">
            Create account
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </AuthShell>
  );
}

export function Register() {
  const navigate = useNavigate();
  const register = useAppStore((state) => state.register);
  const [name, setName] = useState("Camille Martin");
  const [email, setEmail] = useState("camille@nutribudget.app");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register(name, email);
    navigate("/onboarding");
  };

  return (
    <AuthShell title="Create your account" subtitle="Registration is mocked and saved locally.">
      <form className="mt-6 space-y-4" onSubmit={submit}>
        <label className="block">
          <span className="text-sm font-bold">Name</span>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border bg-white px-3 py-3 dark:bg-slate-950">
            <UserRound size={18} className="text-slate-400" />
            <input className="w-full bg-transparent outline-none" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-bold">Email</span>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border bg-white px-3 py-3 dark:bg-slate-950">
            <Mail size={18} className="text-slate-400" />
            <input
              className="w-full bg-transparent outline-none"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
            />
          </div>
        </label>
        <Button type="submit" className="w-full">
          Register
        </Button>
        <p className="text-center text-sm text-slate-500">
          Already onboarded?{" "}
          <Link to="/login" className="font-bold text-nutri-secondary">
            Login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <AuthShell title="Reset password" subtitle="This sends a local mock confirmation only.">
      <form
        className="mt-6 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <label className="block">
          <span className="text-sm font-bold">Email</span>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border bg-white px-3 py-3 dark:bg-slate-950">
            <Mail size={18} className="text-slate-400" />
            <input className="w-full bg-transparent outline-none" defaultValue="camille@nutribudget.app" type="email" />
          </div>
        </label>
        {sent ? (
          <div className="rounded-2xl bg-green-100 p-3 text-sm font-bold text-nutri-secondary dark:bg-green-500/15">
            Mock reset link generated locally.
          </div>
        ) : null}
        <Button type="submit" className="w-full">
          Send reset link
        </Button>
        <Link to="/login" className="block text-center text-sm font-bold text-slate-500">
          Back to login
        </Link>
      </form>
    </AuthShell>
  );
}
