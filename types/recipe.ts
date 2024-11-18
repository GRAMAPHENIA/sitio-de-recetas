export interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    category: string;
    time: number;
    portions: number;
  }