export type Supermarket =
  | "Carrefour"
  | "Leclerc"
  | "Lidl"
  | "Intermarché"
  | "Auchan";

export type NutritionScore = "A" | "B" | "C" | "D" | "E";

export type ProductCategory =
  | "Fruits"
  | "Vegetables"
  | "Proteins"
  | "Dairy"
  | "Grains"
  | "Pantry"
  | "Drinks";

export type MealType = "Breakfast" | "Lunch" | "Dinner";

export type QuizType = "multiple-choice" | "true-false" | "image-selection";

export type Goal = "lose" | "maintain" | "gain";

export type Gender = "female" | "male" | "other";

export interface Promotion {
  id: string;
  productName: string;
  supermarket: Supermarket;
  category: ProductCategory;
  image: string;
  oldPrice: number;
  discountedPrice: number;
  nutritionScore: NutritionScore;
  discountPercent: number;
  tags: string[];
}

export interface Recipe {
  id: string;
  name: string;
  mealType: MealType;
  image: string;
  calories: number;
  price: number;
  preparationTime: number;
  ingredients: string[];
  nutritionScore: number;
  protein: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  checked: boolean;
  quantity: number;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  type: QuizType;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  imageOptions?: Array<{ label: string; image: string }>;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  xpReward: number;
  questionIds: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  target: number;
  metric: "recipes" | "streak" | "saved" | "academy" | "promotions";
}

export interface Coupon {
  id: string;
  title: string;
  supermarket: Supermarket;
  value: number;
  requiredXp: number;
  premiumOnly: boolean;
  description: string;
}

export interface Preferences {
  vegetarian: boolean;
  vegan: boolean;
  allergies: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: Gender;
  goal: Goal;
  monthlyBudget: number;
  preferences: Preferences;
  favoriteStores: Supermarket[];
  xp: number;
  streak: number;
  moneySaved: number;
  recipesGenerated: number;
  achievementsUnlocked: string[];
  completedLessons: string[];
  redeemedCoupons: string[];
}
