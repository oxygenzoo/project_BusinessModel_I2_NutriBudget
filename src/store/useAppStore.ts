import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { recipes } from "@/data/mockData";
import type {
  ProductCategory,
  Recipe,
  ShoppingItem,
  Supermarket,
  UserProfile
} from "@/types";

const todayKey = () => new Date().toISOString().slice(0, 10);

export const getLevel = (xp: number) => Math.min(100, Math.floor(xp / 500) + 1);

export const getLevelProgress = (xp: number) => {
  const levelFloor = Math.floor(xp / 500) * 500;
  return ((xp - levelFloor) / 500) * 100;
};

const defaultUser: UserProfile = {
  name: "Camille Martin",
  email: "camille@nutribudget.app",
  age: 29,
  gender: "other",
  goal: "maintain",
  monthlyBudget: 280,
  preferences: {
    vegetarian: false,
    vegan: false,
    allergies: []
  },
  favoriteStores: ["Carrefour", "Lidl"],
  xp: 860,
  streak: 6,
  moneySaved: 74,
  recipesGenerated: 4,
  achievementsUnlocked: ["first-recipe", "streak-3", "saved-10", "academy-1"],
  completedLessons: ["proteins"],
  redeemedCoupons: []
};

interface MealGenerationState {
  date: string;
  count: number;
  bonus: number;
}

interface AppState {
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  isPremium: boolean;
  theme: "light" | "dark";
  user: UserProfile;
  activeMealPlan: Recipe[];
  shoppingList: ShoppingItem[];
  mealGenerations: MealGenerationState;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (patch: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  toggleTheme: () => void;
  togglePremium: () => void;
  canGenerateMealPlan: () => boolean;
  remainingGenerations: () => number;
  grantRewardedGeneration: () => void;
  generateMealPlan: () => boolean;
  addToShoppingList: (recipe: Recipe) => void;
  toggleShoppingItem: (id: string) => void;
  clearCheckedItems: () => void;
  addXp: (amount: number) => void;
  markLessonComplete: (lessonId: string, xpReward: number) => void;
  redeemCoupon: (couponId: string, xpCost: number) => boolean;
}

const ingredientCategory = (ingredient: string): ProductCategory => {
  const value = ingredient.toLowerCase();
  if (["pomme", "fraise", "avocat", "citron"].some((word) => value.includes(word))) {
    return "Fruits";
  }
  if (
    ["brocolis", "carottes", "courgettes", "epinards", "tomates", "champignons"].some(
      (word) => value.includes(word)
    )
  ) {
    return "Vegetables";
  }
  if (["poulet", "oeufs", "saumon", "thon", "tofu"].some((word) => value.includes(word))) {
    return "Proteins";
  }
  if (["lait", "yaourt", "skyr", "fromage", "feta"].some((word) => value.includes(word))) {
    return "Dairy";
  }
  if (["riz", "avoine", "quinoa", "pates", "pain", "galette"].some((word) => value.includes(word))) {
    return "Grains";
  }
  return "Pantry";
};

const estimateIngredientPrice = (ingredient: string, index: number) => {
  const category = ingredientCategory(ingredient);
  const base = {
    Fruits: 0.75,
    Vegetables: 0.85,
    Proteins: 1.55,
    Dairy: 0.9,
    Grains: 0.65,
    Pantry: 0.7,
    Drinks: 0.6
  }[category];
  return Number((base + (index % 3) * 0.18).toFixed(2));
};

const currentGenerationState = (state: MealGenerationState): MealGenerationState => {
  if (state.date === todayKey()) {
    return state;
  }
  return { date: todayKey(), count: 0, bonus: 0 };
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      onboardingCompleted: false,
      isPremium: false,
      theme: "light",
      user: defaultUser,
      activeMealPlan: recipes.filter((recipe) => ["recipe-1", "recipe-4", "recipe-7"].includes(recipe.id)),
      shoppingList: [],
      mealGenerations: { date: todayKey(), count: 1, bonus: 0 },
      login: (email) =>
        set((state) => ({
          isAuthenticated: true,
          user: { ...state.user, email }
        })),
      register: (name, email) =>
        set((state) => ({
          isAuthenticated: true,
          user: { ...state.user, name, email }
        })),
      logout: () => set({ isAuthenticated: false }),
      updateUser: (patch) =>
        set((state) => ({
          user: {
            ...state.user,
            ...patch,
            preferences: patch.preferences ?? state.user.preferences,
            favoriteStores: patch.favoriteStores ?? state.user.favoriteStores
          }
        })),
      completeOnboarding: () => set({ onboardingCompleted: true, isAuthenticated: true }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light"
        })),
      togglePremium: () => set((state) => ({ isPremium: !state.isPremium })),
      canGenerateMealPlan: () => {
        const state = get();
        if (state.isPremium) {
          return true;
        }
        const generation = currentGenerationState(state.mealGenerations);
        return generation.count < 5 + generation.bonus;
      },
      remainingGenerations: () => {
        const state = get();
        if (state.isPremium) {
          return 999;
        }
        const generation = currentGenerationState(state.mealGenerations);
        return Math.max(0, 5 + generation.bonus - generation.count);
      },
      grantRewardedGeneration: () =>
        set((state) => ({
          mealGenerations: {
            ...currentGenerationState(state.mealGenerations),
            bonus: currentGenerationState(state.mealGenerations).bonus + 1
          }
        })),
      generateMealPlan: () => {
        const state = get();
        const generation = currentGenerationState(state.mealGenerations);
        if (!state.isPremium && generation.count >= 5 + generation.bonus) {
          set({ mealGenerations: generation });
          return false;
        }

        const shift = (generation.count + state.user.recipesGenerated) % 10;
        const pick = (mealType: Recipe["mealType"], offset: number) => {
          const mealRecipes = recipes.filter((recipe) => recipe.mealType === mealType);
          return mealRecipes[(shift + offset) % mealRecipes.length];
        };
        const plan = [pick("Breakfast", 0), pick("Lunch", 1), pick("Dinner", 2)];

        set((current) => ({
          activeMealPlan: plan,
          mealGenerations: current.isPremium
            ? generation
            : { ...generation, count: generation.count + 1 },
          user: {
            ...current.user,
            xp: current.user.xp + 25,
            recipesGenerated: current.user.recipesGenerated + 1,
            moneySaved: Number((current.user.moneySaved + 3.6).toFixed(2))
          }
        }));
        return true;
      },
      addToShoppingList: (recipe) =>
        set((state) => {
          const nextList = [...state.shoppingList];
          recipe.ingredients.forEach((ingredient, index) => {
            const existing = nextList.find((item) => item.name === ingredient);
            if (existing) {
              existing.quantity += 1;
              return;
            }
            nextList.push({
              id: `${recipe.id}-${ingredient.toLowerCase().replace(/\s+/g, "-")}`,
              name: ingredient,
              category: ingredientCategory(ingredient),
              price: estimateIngredientPrice(ingredient, index),
              checked: false,
              quantity: 1
            });
          });
          return { shoppingList: nextList };
        }),
      toggleShoppingItem: (id) =>
        set((state) => ({
          shoppingList: state.shoppingList.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          )
        })),
      clearCheckedItems: () =>
        set((state) => ({
          shoppingList: state.shoppingList.filter((item) => !item.checked)
        })),
      addXp: (amount) =>
        set((state) => ({
          user: { ...state.user, xp: state.user.xp + amount }
        })),
      markLessonComplete: (lessonId, xpReward) =>
        set((state) => {
          const alreadyDone = state.user.completedLessons.includes(lessonId);
          return {
            user: {
              ...state.user,
              xp: state.user.xp + (alreadyDone ? 10 : xpReward),
              streak: state.user.streak + (alreadyDone ? 0 : 1),
              completedLessons: alreadyDone
                ? state.user.completedLessons
                : [...state.user.completedLessons, lessonId]
            }
          };
        }),
      redeemCoupon: (couponId, xpCost) => {
        const state = get();
        if (state.user.xp < xpCost || state.user.redeemedCoupons.includes(couponId)) {
          return false;
        }
        set((current) => ({
          user: {
            ...current.user,
            xp: current.user.xp - xpCost,
            redeemedCoupons: [...current.user.redeemedCoupons, couponId]
          }
        }));
        return true;
      }
    }),
    {
      name: "nutribudget-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        onboardingCompleted: state.onboardingCompleted,
        isPremium: state.isPremium,
        theme: state.theme,
        user: state.user,
        activeMealPlan: state.activeMealPlan,
        shoppingList: state.shoppingList,
        mealGenerations: state.mealGenerations
      })
    }
  )
);
