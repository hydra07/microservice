import http from "@/lib/axios";
import { Ingredient } from "CustomTypes";
import { Recipe } from "CustomTypes";

const API_URL = "/api/recipe";

interface RecipeResponse {
  status: number;
  data: any;
}

export const createRecipe = async (
  recipeData: any
): Promise<RecipeResponse> => {
  try {
    console.log("data", recipeData);
    const res = await http.post(`${API_URL}`, recipeData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.error("res", res.status);
    console.error("res", res.data);
    return { status: res.status, data: res.data };
  } catch (error) {
    console.error("Error creating recipe:", error);
    return { status: 500, data: null };
  }
};

export const updateIngredients = async (recipeId: string, ingredientsData: Ingredient[]) => {
  try {
    const res = await http.put(`${API_URL}/${recipeId}/ingredients`, {
      ingredients: ingredientsData
    });
    if (res.status !== 200) {
      throw new Error(`Failed to update ingredients. Status code: ${res.status}`);
    }
    return res.data; 
  } catch (error) {
    console.error("Error updating ingredients:", error);
    throw error; 
  }
};

export const getRecipeById = async (recipeId: string) => {
  try {
    const { data } = await http.get(`${API_URL}/${recipeId}`);
    return data ?? null;
  } catch (error) {
    console.error("Error getting recipe by ID:", error);
    throw error;
  }
};

export const getPublicRecipes = async (skip: number, take: number) => {
  try {
    const { data } = await http.get(`${API_URL}`, {
      params: { skip, take, isPublic: true }
    });
    return data;
  } catch (error) {
    console.error("Error getting active recipes:", error);
    throw error;
  }
}

export const searchRecipes = async (query: string, ingredients: string[], skip: number, limit: number) => {
  try {
    const params = new URLSearchParams();
    params.append('query', query);
    ingredients.forEach(ingredient => params.append('ingredients', ingredient));
    params.append('skip', skip.toString());
    params.append('limit', limit.toString());

    const { data } = await http.get(`${API_URL}/search?${params.toString()}`);
    return data;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
}