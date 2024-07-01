  // MeasurementForm.tsx
  import React from "react";
  import { NutritionType, ProductType } from "CustomTypes";
  import InputField from "./InputField";
  import TooltipWrapper from "./TooltipWrapper";
  import MeasurementSelect from "./MeasurementSelect";
  interface NutritionFormProps {
    newProduct: ProductType;
    handleInputChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    handleMeasurementChange: (value: number) => void; // Updated type to accept string
    handleNutritionChange: (nutrientKey: string, value: string) => void;
    errors: Record<string, string>;
    handleInputNumberChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;

  }

  const NutritionForm: React.FC<NutritionFormProps> = ({
    newProduct,
    handleInputChange,
    handleMeasurementChange,
    handleNutritionChange,
    handleInputNumberChange,
    errors
  }) => {
    return (
      <div className="space-y-4 space-x-4">
        {/* <TooltipWrapper label="Measurement Name" sideStyle="right"> */}
          <MeasurementSelect
            // value={newProduct.measurement.id.toString()}          
            // onChange={(value) => handleMeasurementChange(parseInt(value))}
            value={newProduct.measurement.id ? newProduct.measurement.id.toString() : ""}
            onChange={(value) => handleMeasurementChange(parseInt(value || "0"))}
          />
          {errors.measurementId && <p className="text-red-500 text-sm mt-1">{errors.measurementId}</p>}
        {/* </TooltipWrapper> */}
        <TooltipWrapper label="Average Weight">
          <InputField
            name="averageWeight"
            placeholder="Average Weight"
            type="number"
            value={newProduct.averageWeight.toString()}
            onChange={handleInputNumberChange}
          />
          {errors.averageWeight && <p className="text-red-500 text-sm mt-1">{errors.averageWeight}</p>}
        </TooltipWrapper>
        {["calories", "sugar", "fat", "sodium", "carbs", "fiber"].map((nutrientKey) => (
          <TooltipWrapper key={nutrientKey} label={nutrientKey.charAt(0).toUpperCase() + nutrientKey.slice(1)}>
            <InputField
              name={nutrientKey}
              placeholder={nutrientKey.charAt(0).toUpperCase() + nutrientKey.slice(1)}
              type="number"
              value={newProduct.nutrition[nutrientKey as keyof NutritionType]?.toString() ?? "0"}
              onChange={(e) => handleNutritionChange(nutrientKey, e.target.value)}
            />
            {errors[nutrientKey] && <p className="text-red-500 text-sm mt-1">{errors[nutrientKey]}</p>}
          </TooltipWrapper>
        ))}
      </div>
    );
  };

  export default NutritionForm;
