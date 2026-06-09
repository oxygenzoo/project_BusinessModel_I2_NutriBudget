import { motion } from "framer-motion";

const colors = ["#22C55E", "#84CC16", "#FBBF24", "#16A34A", "#F59E0B"];

export function Confetti({ active }: { active: boolean }) {
  if (!active) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: 42 }, (_, index) => (
        <motion.span
          key={index}
          className="absolute h-3 w-2 rounded-sm"
          style={{
            background: colors[index % colors.length],
            left: `${(index * 23) % 100}%`,
            top: "-5%"
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{ y: "110vh", rotate: 280 + index * 14, opacity: [1, 1, 0] }}
          transition={{ duration: 1.6 + (index % 8) * 0.08, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
