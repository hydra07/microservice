// validationUtils.ts
import { z } from 'zod';

export const validateSchema = <T>(schema: z.ZodSchema<T>, data: T) => {
  try {
    schema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        acc[err.path.join('.')] = err.message;
        return acc;
      }, {} as Record<string, string>);
      return { success: false, errors };
    }
    return { success: false, errors: { _form: "Unknown error" } };
  }
};

export const checkoutFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(/^\d{10}$/, "Phone number is invalid"),
  address: z.string().trim().min(1, "Address is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  paymentMethod: z.enum(["cod", "vnpay"], {
    required_error: "Please select a payment method",
  }),
  ward: z.string().trim().min(1, "Ward is required"), 
  district: z.string().trim().min(1, "District is required"), 
});

