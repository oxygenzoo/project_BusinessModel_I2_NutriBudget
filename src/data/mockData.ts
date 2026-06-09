import type {
  Achievement,
  Coupon,
  Lesson,
  ProductCategory,
  Promotion,
  QuizQuestion,
  Recipe,
  Supermarket
} from "@/types";

export const supermarkets: Supermarket[] = [
  "Carrefour",
  "Leclerc",
  "Lidl",
  "Intermarché",
  "Auchan"
];

export const categories: ProductCategory[] = [
  "Fruits",
  "Vegetables",
  "Proteins",
  "Dairy",
  "Grains",
  "Pantry",
  "Drinks"
];

const images = {
  fruit:
    "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80",
  vegetable:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
  protein:
    "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80",
  dairy:
    "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80",
  grains:
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
  pantry:
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80",
  drinks:
    "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80",
  breakfast:
    "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=900&q=80",
  lunch:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  dinner:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  bowl:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
  labels:
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80"
};

const productSeeds = [
  ["Pommes Gala France", "Fruits", 2.49, "A", images.fruit, ["local", "fiber"]],
  ["Bananes vrac", "Fruits", 1.89, "A", images.fruit, ["energy", "kids"]],
  ["Fraises gariguette", "Fruits", 4.49, "A", images.fruit, ["seasonal"]],
  ["Poires conference", "Fruits", 2.79, "A", images.fruit, ["fiber"]],
  ["Brocolis frais", "Vegetables", 2.69, "A", images.vegetable, ["vitamins"]],
  ["Carottes bio 1kg", "Vegetables", 2.25, "A", images.vegetable, ["organic"]],
  ["Courgettes France", "Vegetables", 2.95, "A", images.vegetable, ["light"]],
  ["Epinards jeunes pousses", "Vegetables", 2.39, "A", images.vegetable, ["iron"]],
  ["Filets de poulet", "Proteins", 8.9, "B", images.protein, ["protein"]],
  ["Oeufs plein air x12", "Proteins", 3.95, "A", images.protein, ["protein"]],
  ["Saumon frais", "Proteins", 13.9, "B", images.protein, ["omega-3"]],
  ["Tofu nature bio", "Proteins", 2.85, "A", images.protein, ["vegan"]],
  ["Yaourt grec nature", "Dairy", 2.69, "B", images.dairy, ["protein"]],
  ["Fromage blanc 0%", "Dairy", 2.2, "A", images.dairy, ["light"]],
  ["Lait demi-ecreme", "Dairy", 1.45, "B", images.dairy, ["calcium"]],
  ["Skyr nature", "Dairy", 3.15, "A", images.dairy, ["protein"]],
  ["Riz complet", "Grains", 2.3, "A", images.grains, ["wholegrain"]],
  ["Pates completes", "Grains", 1.9, "A", images.grains, ["wholegrain"]],
  ["Flocons d'avoine", "Grains", 1.75, "A", images.grains, ["breakfast"]],
  ["Quinoa tricolore", "Grains", 3.9, "A", images.grains, ["protein"]],
  ["Pois chiches", "Pantry", 1.25, "A", images.pantry, ["vegan"]],
  ["Lentilles vertes", "Pantry", 1.8, "A", images.pantry, ["fiber"]],
  ["Thon naturel", "Pantry", 2.6, "B", images.pantry, ["protein"]],
  ["Huile d'olive vierge", "Pantry", 6.9, "C", images.pantry, ["mediterranean"]],
  ["Eau petillante", "Drinks", 2.1, "A", images.drinks, ["hydration"]]
] as const;

export const promotions: Promotion[] = Array.from({ length: 50 }, (_, index) => {
  const seed = productSeeds[index % productSeeds.length];
  const oldPrice = Number((seed[2] + (index % 4) * 0.18).toFixed(2));
  const discountPercent = 12 + ((index * 7) % 36);
  const discountedPrice = Number((oldPrice * (1 - discountPercent / 100)).toFixed(2));

  return {
    id: `promo-${index + 1}`,
    productName: seed[0],
    supermarket: supermarkets[index % supermarkets.length],
    category: seed[1],
    image: seed[4],
    oldPrice,
    discountedPrice,
    nutritionScore: seed[3],
    discountPercent,
    tags: [...seed[5], discountPercent >= 30 ? "best deal" : "weekly"]
  };
});

const recipeBlueprints: Array<Omit<Recipe, "id">> = [
  {
    name: "Porridge pomme cannelle",
    mealType: "Breakfast",
    image: images.breakfast,
    calories: 390,
    price: 1.45,
    preparationTime: 8,
    ingredients: ["Flocons d'avoine", "Lait demi-ecreme", "Pommes Gala", "Cannelle"],
    nutritionScore: 91,
    protein: 17
  },
  {
    name: "Skyr fruits rouges",
    mealType: "Breakfast",
    image: images.fruit,
    calories: 310,
    price: 1.75,
    preparationTime: 5,
    ingredients: ["Skyr nature", "Fraises", "Flocons d'avoine", "Amandes"],
    nutritionScore: 88,
    protein: 24
  },
  {
    name: "Toast avocat oeuf",
    mealType: "Breakfast",
    image: images.breakfast,
    calories: 430,
    price: 2.1,
    preparationTime: 10,
    ingredients: ["Pain complet", "Oeufs plein air", "Avocat", "Citron"],
    nutritionScore: 84,
    protein: 19
  },
  {
    name: "Bowl quinoa poulet",
    mealType: "Lunch",
    image: images.bowl,
    calories: 620,
    price: 3.95,
    preparationTime: 22,
    ingredients: ["Quinoa", "Filets de poulet", "Brocolis", "Yaourt grec"],
    nutritionScore: 92,
    protein: 42
  },
  {
    name: "Salade lentilles feta",
    mealType: "Lunch",
    image: images.lunch,
    calories: 540,
    price: 2.85,
    preparationTime: 15,
    ingredients: ["Lentilles vertes", "Feta", "Carottes", "Epinards"],
    nutritionScore: 90,
    protein: 25
  },
  {
    name: "Wrap thon crudites",
    mealType: "Lunch",
    image: images.lunch,
    calories: 510,
    price: 2.65,
    preparationTime: 12,
    ingredients: ["Galette complete", "Thon naturel", "Fromage blanc", "Courgettes"],
    nutritionScore: 82,
    protein: 31
  },
  {
    name: "Saumon legumes rotis",
    mealType: "Dinner",
    image: images.dinner,
    calories: 680,
    price: 4.95,
    preparationTime: 28,
    ingredients: ["Saumon frais", "Carottes", "Brocolis", "Riz complet"],
    nutritionScore: 89,
    protein: 38
  },
  {
    name: "Curry pois chiches epinards",
    mealType: "Dinner",
    image: images.vegetable,
    calories: 590,
    price: 2.4,
    preparationTime: 24,
    ingredients: ["Pois chiches", "Epinards", "Riz complet", "Lait de coco leger"],
    nutritionScore: 87,
    protein: 22
  },
  {
    name: "Omelette champignons",
    mealType: "Dinner",
    image: images.protein,
    calories: 470,
    price: 2.2,
    preparationTime: 14,
    ingredients: ["Oeufs plein air", "Champignons", "Epinards", "Fromage blanc"],
    nutritionScore: 85,
    protein: 30
  },
  {
    name: "Pates completes tomate thon",
    mealType: "Dinner",
    image: images.grains,
    calories: 650,
    price: 2.7,
    preparationTime: 18,
    ingredients: ["Pates completes", "Thon naturel", "Tomates", "Huile d'olive"],
    nutritionScore: 81,
    protein: 34
  }
];

const recipeVariants = [
  { suffix: "promo", calories: -20, price: -0.25, time: -1 },
  { suffix: "express", calories: 0, price: 0.05, time: -4 },
  { suffix: "sport", calories: 85, price: 0.4, time: 2 }
];

export const recipes: Recipe[] = recipeBlueprints.flatMap((recipe, recipeIndex) =>
  recipeVariants.map((variant, variantIndex) => ({
    ...recipe,
    id: `recipe-${recipeIndex * recipeVariants.length + variantIndex + 1}`,
    name: `${recipe.name} ${variant.suffix}`,
    calories: recipe.calories + variant.calories,
    price: Number((recipe.price + variant.price).toFixed(2)),
    preparationTime: Math.max(5, recipe.preparationTime + variant.time),
    nutritionScore: Math.min(99, recipe.nutritionScore + variantIndex),
    protein: recipe.protein + (variantIndex === 2 ? 5 : 0)
  }))
);

const lessonBlueprints = [
  {
    id: "proteins",
    title: "Proteins",
    description: "Build balanced meals and compare budget protein sources.",
    color: "from-emerald-500 to-green-600",
    icon: "Dumbbell",
    xpReward: 100
  },
  {
    id: "carbs",
    title: "Carbohydrates",
    description: "Choose slow carbs, fiber-rich staples, and smart portions.",
    color: "from-lime-500 to-emerald-500",
    icon: "Wheat",
    xpReward: 100
  },
  {
    id: "lipids",
    title: "Lipids",
    description: "Spot healthy fats and keep ultra-processed fats in check.",
    color: "from-amber-400 to-orange-500",
    icon: "Droplets",
    xpReward: 100
  },
  {
    id: "budget",
    title: "Budget nutrition",
    description: "Use promos without letting discounts choose your diet.",
    color: "from-green-500 to-teal-500",
    icon: "Coins",
    xpReward: 120
  },
  {
    id: "labels",
    title: "Reading food labels",
    description: "Decode nutrition labels, Nutri-Score, and ingredient lists.",
    color: "from-sky-500 to-emerald-500",
    icon: "ScanLine",
    xpReward: 120
  }
];

const questionSeeds: Array<Omit<QuizQuestion, "id" | "lessonId">> = [
  {
    type: "multiple-choice",
    prompt: "Which option is usually the most affordable high-protein pantry staple?",
    options: ["Lentils", "Fresh salmon", "Protein bars", "Aged cheese"],
    correctAnswer: "Lentils",
    explanation: "Lentils combine protein, fiber, and a low price per serving."
  },
  {
    type: "true-false",
    prompt: "A balanced plate can include carbohydrates.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Whole grains, legumes, and potatoes can be useful energy sources."
  },
  {
    type: "multiple-choice",
    prompt: "What does fiber help with?",
    options: ["Satiety", "Dehydration", "Removing all calories", "Making food premium"],
    correctAnswer: "Satiety",
    explanation: "Fiber slows digestion and helps you feel full for longer."
  },
  {
    type: "image-selection",
    prompt: "Pick the most vegetable-forward plate.",
    options: ["Vegetable bowl", "Sugary drink", "Plain pastries"],
    correctAnswer: "Vegetable bowl",
    explanation: "Vegetables add volume, vitamins, minerals, and fiber.",
    imageOptions: [
      { label: "Vegetable bowl", image: images.lunch },
      { label: "Sugary drink", image: images.drinks },
      { label: "Plain pastries", image: images.breakfast }
    ]
  },
  {
    type: "multiple-choice",
    prompt: "Which label detail is most useful for comparing similar products?",
    options: ["Nutrition per 100g", "Package color", "Shelf height", "Mascot"],
    correctAnswer: "Nutrition per 100g",
    explanation: "Per-100g values let you compare products fairly."
  },
  {
    type: "true-false",
    prompt: "A discount is always a good deal if the product is healthy.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "A deal only helps if it fits your plan, budget, and portions."
  },
  {
    type: "multiple-choice",
    prompt: "Which fat source is commonly recommended in a Mediterranean-style diet?",
    options: ["Olive oil", "Hydrogenated fat", "Palm oil sweets", "Cream filling"],
    correctAnswer: "Olive oil",
    explanation: "Olive oil is rich in monounsaturated fats."
  },
  {
    type: "multiple-choice",
    prompt: "What is a simple budget move before shopping?",
    options: ["Check your pantry", "Skip the list", "Buy every promo", "Shop hungry"],
    correctAnswer: "Check your pantry",
    explanation: "Using what you already own reduces waste and duplicate purchases."
  },
  {
    type: "true-false",
    prompt: "Nutri-Score A is generally more favorable than Nutri-Score D.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Nutri-Score summarizes nutritional quality from A to E."
  },
  {
    type: "multiple-choice",
    prompt: "Which meal is usually the most complete?",
    options: ["Protein, vegetables, whole grain", "Only soda", "Only candy", "Only sauce"],
    correctAnswer: "Protein, vegetables, whole grain",
    explanation: "Combining food groups improves satiety and nutrient coverage."
  },
  {
    type: "multiple-choice",
    prompt: "Which protein source suits a vegan preference?",
    options: ["Tofu", "Chicken", "Skyr", "Eggs"],
    correctAnswer: "Tofu",
    explanation: "Tofu is plant-based and protein-rich."
  },
  {
    type: "true-false",
    prompt: "Whole grains usually contain more fiber than refined grains.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "Whole grains keep more of the grain structure."
  },
  {
    type: "multiple-choice",
    prompt: "Which habit supports a daily streak?",
    options: ["One short lesson per day", "Waiting for Sunday", "Skipping basics", "Only reading ads"],
    correctAnswer: "One short lesson per day",
    explanation: "Small, repeatable practice keeps learning momentum."
  },
  {
    type: "image-selection",
    prompt: "Pick the product group that usually gives the most fiber per euro.",
    options: ["Legumes", "Soft drinks", "Chocolate bars"],
    correctAnswer: "Legumes",
    explanation: "Beans, lentils, and chickpeas are budget-friendly fiber staples.",
    imageOptions: [
      { label: "Legumes", image: images.pantry },
      { label: "Soft drinks", image: images.drinks },
      { label: "Chocolate bars", image: images.dinner }
    ]
  },
  {
    type: "multiple-choice",
    prompt: "What should you compare when two yogurts are on promotion?",
    options: ["Sugar and protein", "Logo size", "Ad color", "Checkout lane"],
    correctAnswer: "Sugar and protein",
    explanation: "Sugar and protein strongly affect nutrition quality."
  },
  {
    type: "true-false",
    prompt: "Premium coupons in this mock app are simulated only.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "NutriBudget stores rewards locally in this frontend demo."
  },
  {
    type: "multiple-choice",
    prompt: "Which dinner is likely the best value for protein and fiber?",
    options: ["Chickpea curry", "Cream dessert", "Sugary cereal", "Fried snack"],
    correctAnswer: "Chickpea curry",
    explanation: "Chickpeas bring plant protein, fiber, and low cost."
  },
  {
    type: "multiple-choice",
    prompt: "Which label list usually signals a simpler product?",
    options: ["Few recognizable ingredients", "Many additives first", "Mostly sugar names", "No nutrition table"],
    correctAnswer: "Few recognizable ingredients",
    explanation: "Short, recognizable ingredient lists are easier to evaluate."
  },
  {
    type: "true-false",
    prompt: "Meal planning can reduce impulse purchases.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "A plan turns promotions into intentional purchases."
  },
  {
    type: "multiple-choice",
    prompt: "Which snack keeps you fuller for longer?",
    options: ["Apple with skyr", "Soda alone", "Candy alone", "Plain syrup"],
    correctAnswer: "Apple with skyr",
    explanation: "Protein plus fiber is a strong satiety combination."
  }
];

const lessonIds = lessonBlueprints.map((lesson) => lesson.id);

export const quizQuestions: QuizQuestion[] = Array.from({ length: 100 }, (_, index) => {
  const seed = questionSeeds[index % questionSeeds.length];
  return {
    ...seed,
    id: `quiz-${index + 1}`,
    lessonId: lessonIds[index % lessonIds.length],
    prompt: `${seed.prompt} ${index >= questionSeeds.length ? `(round ${Math.floor(index / questionSeeds.length) + 1})` : ""}`.trim()
  };
});

export const lessons: Lesson[] = lessonBlueprints.map((lesson) => ({
  ...lesson,
  questionIds: quizQuestions
    .filter((question) => question.lessonId === lesson.id)
    .map((question) => question.id)
}));

export const achievements: Achievement[] = [
  ["first-recipe", "First recipe", "Generate your first meal plan.", 50, 1, "recipes"],
  ["three-recipes", "Meal prep starter", "Generate 3 recipes.", 60, 3, "recipes"],
  ["ten-recipes", "Kitchen planner", "Generate 10 recipes.", 90, 10, "recipes"],
  ["thirty-recipes", "Batch cook boss", "Generate 30 recipes.", 150, 30, "recipes"],
  ["streak-3", "Three-day spark", "Keep a 3-day learning streak.", 60, 3, "streak"],
  ["streak-7", "7-day streak", "Keep a 7-day learning streak.", 120, 7, "streak"],
  ["streak-14", "Two-week rhythm", "Keep a 14-day learning streak.", 180, 14, "streak"],
  ["streak-30", "Month of momentum", "Keep a 30-day learning streak.", 300, 30, "streak"],
  ["saved-10", "First savings", "Save 10 euros.", 50, 10, "saved"],
  ["saved-50", "Cart optimizer", "Save 50 euros.", 100, 50, "saved"],
  ["saved-100", "100 euros saved", "Save 100 euros.", 180, 100, "saved"],
  ["saved-250", "Budget master", "Save 250 euros.", 300, 250, "saved"],
  ["academy-1", "First lesson", "Complete 1 NutriAcademy lesson.", 60, 1, "academy"],
  ["academy-5", "Nutrition Expert", "Complete all starter lessons.", 200, 5, "academy"],
  ["academy-15", "Label detective", "Complete 15 lessons.", 250, 15, "academy"],
  ["academy-30", "Food science fan", "Complete 30 lessons.", 400, 30, "academy"],
  ["promo-5", "Promotion Hunter", "Review 5 promoted products.", 60, 5, "promotions"],
  ["promo-20", "Deal scanner", "Review 20 promoted products.", 140, 20, "promotions"],
  ["promo-50", "Aisle strategist", "Review 50 promoted products.", 240, 50, "promotions"],
  ["promo-100", "Supermarket pro", "Review 100 promoted products.", 420, 100, "promotions"]
].map(([id, name, description, xpReward, target, metric]) => ({
  id,
  name,
  description,
  xpReward,
  target,
  metric
})) as Achievement[];

const couponValues = [2, 5, 10];

export const coupons: Coupon[] = Array.from({ length: 15 }, (_, index) => {
  const value = couponValues[index % couponValues.length];
  const supermarket = supermarkets[index % supermarkets.length];
  return {
    id: `coupon-${index + 1}`,
    title: `${value}€ coupon`,
    supermarket,
    value,
    requiredXp: 250 + value * 90 + index * 35,
    premiumOnly: index % 5 === 4 || value === 10,
    description: `Mock ${value} euro discount for a healthy basket at ${supermarket}.`
  };
});

export const savingsData = [
  { month: "Jan", saved: 18, budget: 260 },
  { month: "Feb", saved: 26, budget: 250 },
  { month: "Mar", saved: 33, budget: 240 },
  { month: "Apr", saved: 42, budget: 235 },
  { month: "May", saved: 58, budget: 228 },
  { month: "Jun", saved: 74, budget: 220 }
];

export const nutritionData = [
  { name: "Protein", score: 82 },
  { name: "Fiber", score: 76 },
  { name: "Fruits", score: 88 },
  { name: "Budget", score: 91 },
  { name: "Sugar", score: 70 },
  { name: "Variety", score: 84 }
];

export const mockAds = [
  {
    brand: "GreenPanier",
    title: "Seasonal vegetable box",
    body: "A mock sponsored offer for fresh produce planning.",
    cta: "View mock offer"
  },
  {
    brand: "EcoCourses",
    title: "Reusable shopping bags",
    body: "Mock ad: organize your weekly grocery trip with less waste.",
    cta: "Learn more"
  },
  {
    brand: "NutriScan",
    title: "Compare labels faster",
    body: "A realistic native ad placement. No real tracking, no backend.",
    cta: "Try demo"
  }
];
