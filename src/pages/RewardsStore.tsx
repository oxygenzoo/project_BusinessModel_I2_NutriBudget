import { Link } from "react-router-dom";
import { Gift, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { coupons } from "@/data/mockData";
import { useAppStore } from "@/store/useAppStore";

export function RewardsStore() {
  const user = useAppStore((state) => state.user);
  const isPremium = useAppStore((state) => state.isPremium);
  const redeemCoupon = useAppStore((state) => state.redeemCoupon);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-amber-400 to-lime-500 text-slate-950">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge tone="premium">Rewards Store</Badge>
            <h1 className="mt-3 text-3xl font-black">Spend XP on mock coupons</h1>
            <p className="mt-2 max-w-2xl font-semibold text-slate-800">
              Earn XP in NutriAcademy and redeem simulated grocery coupons.
            </p>
          </div>
          <div className="rounded-3xl bg-white/70 p-5">
            <p className="text-sm font-black uppercase tracking-[0.15em] text-slate-600">Balance</p>
            <p className="text-4xl font-black">{user.xp} XP</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {coupons.map((coupon) => {
          const redeemed = user.redeemedCoupons.includes(coupon.id);
          const premiumLocked = coupon.premiumOnly && !isPremium;
          const xpLocked = user.xp < coupon.requiredXp;
          const locked = premiumLocked || xpLocked || redeemed;

          return (
            <motion.div key={coupon.id} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
              <Card className={`relative overflow-hidden ${premiumLocked ? "border-amber-200" : ""}`}>
                <div className="absolute right-4 top-4">
                  {coupon.premiumOnly ? <Badge tone="premium">Premium</Badge> : <Badge tone="green">Free</Badge>}
                </div>
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-green-100 text-nutri-secondary dark:bg-green-500/15">
                  <Gift size={30} />
                </div>
                <h2 className="mt-5 text-2xl font-black">{coupon.title}</h2>
                <p className="mt-1 text-sm font-bold text-nutri-secondary">{coupon.supermarket}</p>
                <p className="mt-3 text-slate-600 dark:text-slate-300">{coupon.description}</p>
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
                  <span className="font-bold">Cost</span>
                  <span className="text-xl font-black">{coupon.requiredXp} XP</span>
                </div>
                {premiumLocked ? (
                  <Link to="/premium">
                    <Button variant="premium" className="mt-5 w-full">
                      <ShieldCheck size={18} />
                      Unlock Premium
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="mt-5 w-full"
                    variant={redeemed ? "outline" : xpLocked ? "ghost" : "primary"}
                    disabled={locked}
                    onClick={() => redeemCoupon(coupon.id, coupon.requiredXp)}
                  >
                    {redeemed ? (
                      <>
                        <Sparkles size={18} />
                        Redeemed
                      </>
                    ) : xpLocked ? (
                      <>
                        <Lock size={18} />
                        Locked
                      </>
                    ) : (
                      "Redeem coupon"
                    )}
                  </Button>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
