import http from "@/lib/axios";
import { ReviewType } from "CustomTypes";


export const createReview = async (reviewData: FormData): Promise<ReviewType | null> => {
  try {
    const response = await http.post('/api/review', reviewData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error creating review:', error);
    return null;
  }
};

export const getReview = async (productId: number, page: number = 1, limit: number = 3): Promise<{ reviews: ReviewType[], total: number } | null> => {
  try {
    const response = await http.get(`/api/product/${productId}/reviews`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return null;
  }
}