import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";

export function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle dark mode">
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
