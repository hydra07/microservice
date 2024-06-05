// MeasurementForm.tsx
import React from "react";
import { NutritionType, ProductType } from "CustomTypes";
import InputField from "./InputField";
import TooltipWrapper from "./TooltipWrapper";

interface MeasurementFormProps {
  newProduct: ProductType;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleMeasurementChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleNutritionChange: (key: string, value: string) => void;
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({
  newProduct,
  handleInputChange,
  handleMeasurementChange,
  handleNutritionChange,
}) => {
  return (
    <div className="space-y-4">
      <TooltipWrapper label="Measurement Name" sideStyle="right">
        <InputField
          name="measurement.name"
          placeholder="Measurement Name"
          value={newProduct.measurement.name}
          onChange={handleMeasurementChange}
          type="text"
        />
      </TooltipWrapper>
      <TooltipWrapper label="Average Weight">
        <InputField
          name="averageWeight"
          placeholder="Average Weight"
          type="number"
          value={newProduct.averageWeight.toString()}
          onChange={handleInputChange}
        />
      </TooltipWrapper>
      {["calories", "sugar", "fat", "sodium", "carbs", "fiber"].map((key) => (
        <TooltipWrapper key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
          <InputField
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            type="number"
            value={newProduct.nutrition[key as keyof NutritionType]?.toString() ?? "0"}
            onChange={(e) => handleNutritionChange(key, e.target.value)}
          />
        </TooltipWrapper>
      ))}
    </div>
  );
};

export default MeasurementForm;
