import { create } from "zustand";

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  category: string;
  time: number;
  portions: number;
  user_id: string;
}

interface RecipeState {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),
}));
