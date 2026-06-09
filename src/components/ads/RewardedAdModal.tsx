import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlayCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function RewardedAdModal({
  open,
  onClose,
  onReward
}: {
  open: boolean;
  onClose: () => void;
  onReward: () => void;
}) {
  const [watching, setWatching] = useState(false);

  const watch = () => {
    setWatching(true);
    window.setTimeout(() => {
      onReward();
      setWatching(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900"
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-nutri-secondary">Rewarded ad</p>
                <h2 className="mt-2 text-2xl font-black">Unlock one extra meal plan</h2>
              </div>
              <button
                className="focus-ring rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={onClose}
                aria-label="Close rewarded ad"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-5 rounded-3xl bg-slate-950 p-6 text-white">
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-lime-400">
                <PlayCircle size={54} />
              </div>
              <p className="mt-4 text-sm text-slate-200">
                Mock 30-second ad preview. The demo grants a bonus generation after a short animation.
              </p>
            </div>
            <Button className="mt-5 w-full" onClick={watch} disabled={watching}>
              {watching ? "Watching..." : "Watch mock ad"}
            </Button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
