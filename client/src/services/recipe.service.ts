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
    console.log('rele', data);
    return data ?? null;
  } catch (error) {
    console.error("Error getting recipe by ID:", error);
    throw error;
  }
};
export const getRecipesByUserId = async (userId: string): Promise<Recipe[] | null> => {
  try {
    const { data } = await http.get(`${API_URL}/user/${userId}`);
    return data ?? null;
  } catch (error) {
    console.error("Error getting recipes by user ID:", error);
    throw error;
  }
};
