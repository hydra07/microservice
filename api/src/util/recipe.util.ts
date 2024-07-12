import { CreateIngredientDTO, CreateRecipeDTO, CreateStepDTO } from "@/dto/create-recipe.dto";

export const parseIngredients = (body: Record<string, any>): CreateIngredientDTO[] => {
    const ingredients: CreateIngredientDTO[] = body.ingredients.map((ingredient: any) => ({
        name: ingredient.name,
        quantity: ingredient.quantity,
    }));
    return ingredients;
};

export const parseSteps = (body: Record<string, any>): CreateStepDTO[] => {
    const steps: CreateStepDTO[] = body.steps.map((step: any) => ({
        description: step.description,
        images: step.images || [],
    }));
    return steps;
};
