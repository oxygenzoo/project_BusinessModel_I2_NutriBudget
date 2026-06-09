import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { supermarkets } from "@/data/mockData";
import type { Gender, Goal, Preferences, Supermarket } from "@/types";
import { useAppStore } from "@/store/useAppStore";

const steps = ["Personal", "Goals", "Budget", "Preferences", "Stores"];

export function Onboarding() {
  const navigate = useNavigate();
  const user = useAppStore((state) => state.user);
  const updateUser = useAppStore((state) => state.updateUser);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState<Gender>(user.gender);
  const [goal, setGoal] = useState<Goal>(user.goal);
  const [budget, setBudget] = useState(user.monthlyBudget);
  const [preferences, setPreferences] = useState<Preferences>(user.preferences);
  const [favoriteStores, setFavoriteStores] = useState<Supermarket[]>(user.favoriteStores);
  const completed = step >= steps.length;

  const finish = () => {
    updateUser({ age, gender, goal, monthlyBudget: budget, preferences, favoriteStores });
    completeOnboarding();
    navigate("/dashboard");
  };

  const toggleStore = (store: Supermarket) => {
    setFavoriteStores((current) =>
      current.includes(store) ? current.filter((item) => item !== store) : [...current, store]
    );
  };

  return (
    <div className="min-h-screen bg-nutri-background p-4 dark:bg-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center">
        <div className="mb-6 flex items-center gap-2 text-xl font-black">
          <span className="rounded-2xl bg-nutri-primary p-2 text-white">
            <Leaf size={22} />
          </span>
          NutriBudget
        </div>
        <Card className="p-5 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-nutri-secondary">Onboarding</p>
              <h1 className="mt-2 text-3xl font-black">{completed ? "You are ready" : steps[step]}</h1>
            </div>
            <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-black text-nutri-secondary dark:bg-green-500/15">
              {Math.min(step + 1, steps.length)}/{steps.length}
            </div>
          </div>
          <ProgressBar value={(Math.min(step, steps.length) / steps.length) * 100} className="mt-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="mt-8"
            >
              {step === 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="text-sm font-bold">Age</span>
                    <input
                      className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 outline-none focus:border-nutri-primary dark:bg-slate-950"
                      type="number"
                      value={age}
                      onChange={(event) => setAge(Number(event.target.value))}
                    />
                  </label>
                  <label>
                    <span className="text-sm font-bold">Gender</span>
                    <select
                      className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 outline-none focus:border-nutri-primary dark:bg-slate-950"
                      value={gender}
                      onChange={(event) => setGender(event.target.value as Gender)}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["lose", "Lose weight", "Higher satiety, controlled calories."],
                    ["maintain", "Maintain weight", "Balanced meals and stable spend."],
                    ["gain", "Gain weight", "Higher protein and energy."]
                  ].map(([value, title, body]) => (
                    <button
                      key={value}
                      onClick={() => setGoal(value as Goal)}
                      className={`rounded-3xl border p-4 text-left transition ${
                        goal === value
                          ? "border-nutri-primary bg-green-50 text-nutri-secondary dark:bg-green-500/15"
                          : "bg-white dark:bg-slate-950"
                      }`}
                    >
                      <p className="font-black">{title}</p>
                      <p className="mt-1 text-sm text-slate-500">{body}</p>
                    </button>
                  ))}
                </div>
              ) : null}

              {step === 2 ? (
                <div>
                  <div className="rounded-3xl bg-green-50 p-6 text-center dark:bg-green-500/10">
                    <p className="text-sm font-bold text-slate-500">Monthly food budget</p>
                    <p className="mt-2 text-5xl font-black text-nutri-secondary">{budget}€</p>
                  </div>
                  <input
                    className="mt-8 w-full accent-nutri-primary"
                    type="range"
                    min={120}
                    max={700}
                    step={10}
                    value={budget}
                    onChange={(event) => setBudget(Number(event.target.value))}
                  />
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-4">
                  {[
                    ["vegetarian", "Vegetarian"],
                    ["vegan", "Vegan"]
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center justify-between rounded-2xl border p-4">
                      <span className="font-bold">{label}</span>
                      <input
                        className="h-5 w-5 accent-nutri-primary"
                        type="checkbox"
                        checked={preferences[key as "vegetarian" | "vegan"]}
                        onChange={(event) =>
                          setPreferences((current) => ({ ...current, [key]: event.target.checked }))
                        }
                      />
                    </label>
                  ))}
                  <label className="block">
                    <span className="text-sm font-bold">Allergies</span>
                    <input
                      className="mt-2 w-full rounded-2xl border bg-white px-4 py-3 outline-none focus:border-nutri-primary dark:bg-slate-950"
                      placeholder="nuts, lactose, gluten"
                      value={preferences.allergies.join(", ")}
                      onChange={(event) =>
                        setPreferences((current) => ({
                          ...current,
                          allergies: event.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean)
                        }))
                      }
                    />
                  </label>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {supermarkets.map((store) => (
                    <button
                      key={store}
                      onClick={() => toggleStore(store)}
                      className={`flex items-center justify-between rounded-2xl border p-4 text-left font-black transition ${
                        favoriteStores.includes(store)
                          ? "border-nutri-primary bg-green-50 text-nutri-secondary dark:bg-green-500/15"
                          : "bg-white dark:bg-slate-950"
                      }`}
                    >
                      {store}
                      {favoriteStores.includes(store) ? <Check size={20} /> : null}
                    </button>
                  ))}
                </div>
              ) : null}

              {completed ? (
                <div className="text-center">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100 text-nutri-secondary dark:bg-green-500/15">
                    <Check size={42} />
                  </div>
                  <h2 className="mt-5 text-3xl font-black">Your plan is personalized</h2>
                  <p className="mt-2 text-slate-500">Budget, goals, stores, and preferences are saved locally.</p>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>
              <ChevronLeft size={18} />
              Back
            </Button>
            {completed ? (
              <Button onClick={finish}>Go to dashboard</Button>
            ) : (
              <Button onClick={() => setStep((current) => current + 1)}>
                {step === steps.length - 1 ? "Complete" : "Next"}
                <ChevronRight size={18} />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
