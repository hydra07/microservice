import { z } from "zod";

const nutritionSchema = z.object({
  calories: z.number().min(0, "Calories must be non-negative"),
  sugar: z.number().min(0, "Sugar must be non-negative"),
  fat: z.number().min(0, "Fat must be non-negative"),
  sodium: z.number().min(0, "Sodium must be non-negative"),
  carbs: z.number().min(0, "Carbs must be non-negative"),
  fiber: z.number().min(0, "Fiber must be non-negative"),
});


export const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(2, "Description must be at least 10 characters"),
    category: z.object({
      id: z.string().min(1, "Category is required"),
      name: z.string(),
      isActive: z.boolean(),
    }),
    measurement: z.object({
      id: z.number().min(1, "Measurement is required"),
      unit: z.string(),
    }),
    averageWeight: z.number().min(0, "Average weight must be non-negative"),
    nutrition: nutritionSchema,
    
    currentQuantity: z.number().min(0, "Current quantity must be non-negative"),
    price: z.number().min(0, "Price must be non-negative"),
    amountToSell: z.number().min(0, "Amount to sell must be non-negative"),
    
  });

  export type ProductFormData = z.infer<typeof productSchema>;

