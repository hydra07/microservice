import http from "@/lib/axios";
import { Ingredient } from "CustomTypes";
import { Recipe } from "CustomTypes";

const API_URL = "/api/recipe";
export const getPostWithUserId = async (userId: string) => {

    try {
        const { data } = await http.get(`${API_URL}/user/${userId}`);
        return data;
    } catch (error) {
        console.error("Error getting posts by user ID:", error);
        throw error;
    }
};