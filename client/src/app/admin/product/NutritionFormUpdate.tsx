// NutritionForm.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NutritionData, nutritionFormSchema } from "@/validation/productSchema";
import InputField from "./InputField";
import TooltipWrapper from "./TooltipWrapper";
import MeasurementSelect from "./MeasurementSelect";

interface NutritionFormProps {
  onSubmit: (data: NutritionData) => void;
  defaultValues?: Partial<NutritionData>;
}
type NutritionKey = "calories" | "sugar" | "fat" | "sodium" | "carbs" | "fiber";

const NutritionForm: React.FC<NutritionFormProps> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<NutritionData>({
    resolver: zodResolver(nutritionFormSchema),
    defaultValues: {
        measurementId: 0, // Thay đổi từ 0 sang undefined
        averageWeight: 0,
        nutrition: {
          calories: 0,
          sugar: 0,
          fat: 0,
          sodium: 0,
          carbs: 0,
          fiber: 0,
        },
      ...defaultValues,
    },
  });
  const nutritionKeys: NutritionKey[] = ["calories", "sugar", "fat", "sodium", "carbs", "fiber"];


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={control}
        name="measurementId"
        render={({ field }) => (
          <>
            <MeasurementSelect value={field.value.toString()} onChange={field.onChange} />
            {errors.measurementId && <p className="text-red-500 text-sm mt-1">{errors.measurementId.message}</p>}
          </>
        )}
      />

      <TooltipWrapper label="Average Weight">
        <Controller
          control={control}
          name="averageWeight"
          render={({ field }) => (
            <>
              <InputField {...field} placeholder="Average Weight" type="number" />
              {errors.averageWeight && <p className="text-red-500 text-sm mt-1">{errors.averageWeight.message}</p>}
            </>
          )}
        />
      </TooltipWrapper>
      

      {nutritionKeys.map((key) => (
        <TooltipWrapper key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
          <Controller
            control={control}
            name={`nutrition.${key}`}
            render={({ field }) => (
              <>
                <InputField {...field} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} type="number" />
                {errors.nutrition?.[key] && <p className="text-red-500 text-sm mt-1">{errors.nutrition[key].message}</p>}
              </>
            )}
          />
        </TooltipWrapper>
      ))}

      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Next
      </button>
    </form>
  );
};

export default NutritionForm;