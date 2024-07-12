interface CreateIngredientDTO {
  name: string;
  quantity: string;
}

interface CreateStepDTO {
  description: string;
  images: string[];
}

interface CreateRecipeDTO {
  userId: string;
  title: string;
  description: string;
  cook_time: number;
  serving: number;
  difficulty: string;
  images?: string[];
  ingredients: CreateIngredientDTO[];
  steps: CreateStepDTO[];
  isPublic: boolean;
  createAt?: Date;
}

export { CreateRecipeDTO, CreateIngredientDTO, CreateStepDTO};  