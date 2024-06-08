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
    handleNutritionChange: (key: string, value: string) => void;
  }

  const NutritionForm: React.FC<NutritionFormProps> = ({
    newProduct,
    handleInputChange,
    handleMeasurementChange,
    handleNutritionChange,
  }) => {
    return (
      <div className="space-y-4">
        {/* <TooltipWrapper label="Measurement Name" sideStyle="right"> */}
          <MeasurementSelect
            value={newProduct.measurement.id.toString()}
            // onChange={handleMeasurementChange}
            onChange={(value) => handleMeasurementChange(parseInt(value))}
          />
        {/* </TooltipWrapper> */}
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

  export default NutritionForm;
