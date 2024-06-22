// NutritionForm.tsx
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ProductFormData } from "@/validation/productSchema";
import InputField from "./InputField";
import TooltipWrapper from "./TooltipWrapper";
import MeasurementSelect from "./MeasurementSelect";

interface NutritionFormProps {
  control: any;
  errors: any;
  register: any;
}

type NutritionKey = "calories" | "sugar" | "fat" | "sodium" | "carbs" | "fiber";

const NutritionFormUpdate: React.FC<NutritionFormProps> = ({
  control,
  errors,
  register,
}) => {
  const nutritionKeys: NutritionKey[] = [
    "calories",
    "sugar",
    "fat",
    "sodium",
    "carbs",
    "fiber",
  ];

  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name="measurementId"
        render={({ field }) => (
          <>
            <MeasurementSelect
              value={field.value.toString()}
              onChange={(value) => field.onChange(parseInt(value))}
            />
            {errors.measurementId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.measurementId.message}
              </p>
            )}
          </>
        )}
      />

      <TooltipWrapper label="Average Weight">
        <Controller
          control={control}
          name="averageWeight"
          render={({ field }) => (
            <>
              <InputField
                {...field}
                onChange={(e) => {
                  field.onChange(parseFloat(e.target.value));
                }}
                placeholder="Average Weight"
                type="number"
                ref={null}
              />
              {errors.averageWeight && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.averageWeight.message}
                </p>
              )}
            </>
          )}
        />
      </TooltipWrapper>

      {nutritionKeys.map((key) => (
        <TooltipWrapper
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
        >
          <Controller
            control={control}
            name={`nutrition.${key}`}
            render={({ field }) => (
              <>
                <InputField
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseFloat(e.target.value));
                  }}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  type="number"
                  ref={null}
                />
                {errors.nutrition?.[key] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nutrition[key].message}
                  </p>
                )}
              </>
            )}
          />
        </TooltipWrapper>
      ))}
    </div>
  );
};

export default NutritionFormUpdate;
