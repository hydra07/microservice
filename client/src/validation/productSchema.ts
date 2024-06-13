// productSchema.ts
import * as z from 'zod';

const nutritionSchema = z.object({
  calories: z.coerce.number().min(0, "Calories must be 0 or greater"),
  sugar: z.coerce.number().min(0, "Sugar must be 0 or greater"),
  fat: z.coerce.number().min(0, "Fat must be 0 or greater"),
  sodium: z.coerce.number().min(0, "Sodium must be 0 or greater"),
  carbs: z.coerce.number().min(0, "Carbs must be 0 or greater"),
  fiber: z.coerce.number().min(0, "Fiber must be 0 or greater"),
});

export const basicInfoSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  currentQuantity: z.coerce.number().min(0, "Current quantity must be 0 or greater"),
  amountToSell: z.coerce.number().min(0, "Amount to sell must be 0 or greater"),
  categoryId: z.number().min(1, "Category is required"),
});

export const nutritionFormSchema = z.object({
  measurementId: z.number().min(1, "Measurement is required"),
  averageWeight: z.coerce.number().min(0, "Average weight must be 0 or greater"),
  nutrition: nutritionSchema,
});

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: basicInfoSchema.shape.description,
  price: basicInfoSchema.shape.price,
  currentQuantity: basicInfoSchema.shape.currentQuantity,
  amountToSell: basicInfoSchema.shape.amountToSell,
  categoryId: basicInfoSchema.shape.categoryId,
  measurementId: nutritionFormSchema.shape.measurementId,
  averageWeight: nutritionFormSchema.shape.averageWeight,
  nutrition: nutritionFormSchema.shape.nutrition,
  imgProducts: z.array(z.object({ imageUrl: z.string(), publicId: z.string() })).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>; 
export type BasicInfoData = z.infer<typeof basicInfoSchema>;
export type NutritionData = z.infer<typeof nutritionFormSchema>;