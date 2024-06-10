// productSchema.ts
import * as z from 'zod';

const nutritionSchema = z.object({
  calories: z.number().min(0, "Calories must be 0 or greater"),
  sugar: z.number().min(0, "Sugar must be 0 or greater"),
  fat: z.number().min(0, "Fat must be 0 or greater"),
  sodium: z.number().min(0, "Sodium must be 0 or greater"),
  carbs: z.number().min(0, "Carbs must be 0 or greater"),
  fiber: z.number().min(0, "Fiber must be 0 or greater"),
});

export const basicInfoSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be 0 or greater"),
  currentQuantity: z.number().min(0, "Current quantity must be 0 or greater"),
  amountToSell: z.number().min(0, "Amount to sell must be 0 or greater"),
  categoryId: z.number().min(1, "Category is required"),
});

export const nutritionFormSchema = z.object({
  measurementId: z.number().min(1, "Measurement is required"),
  averageWeight: z.number().min(0, "Average weight must be 0 or greater"),
  nutrition: nutritionSchema,
});

export type BasicInfoData = z.infer<typeof basicInfoSchema>;
export type NutritionData = z.infer<typeof nutritionFormSchema>;