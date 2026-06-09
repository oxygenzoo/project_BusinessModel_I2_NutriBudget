import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { useAppStore } from "@/store/useAppStore";
import { Academy } from "@/pages/Academy";
import { Dashboard } from "@/pages/Dashboard";
import { ForgotPassword, Login, Register } from "@/pages/AuthPages";
import { Landing } from "@/pages/Landing";
import { MealPlanner } from "@/pages/MealPlanner";
import { Onboarding } from "@/pages/Onboarding";
import { Premium } from "@/pages/Premium";
import { Profile } from "@/pages/Profile";
import { Promotions } from "@/pages/Promotions";
import { RewardsStore } from "@/pages/RewardsStore";
import { ShoppingList } from "@/pages/ShoppingList";

export function App() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/premium" element={<Premium />} />
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/rewards" element={<RewardsStore />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
