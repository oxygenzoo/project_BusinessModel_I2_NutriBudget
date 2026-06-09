import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nutri: {
          primary: "#22C55E",
          secondary: "#16A34A",
          accent: "#84CC16",
          warning: "#F59E0B",
          danger: "#EF4444",
          premium: "#FBBF24",
          background: "#F8FAFC"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.10)",
        glow: "0 18px 45px rgba(34, 197, 94, 0.28)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
