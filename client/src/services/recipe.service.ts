import http from "@/lib/axios";

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
