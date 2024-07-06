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
