// BasicInfoForm.tsx
import React from "react";
import { ProductType } from "CustomTypes";
import InputField from "./InputField";
import TooltipWrapper from "./TooltipWrapper";

interface BasicInfoFormProps {
  newProduct: ProductType;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  newProduct,
  handleInputChange,
}) => {
  return (
    <div className="space-y-4">
      <TooltipWrapper label="Product Name">
        <InputField
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          type="text"
        />
      </TooltipWrapper>
      <TooltipWrapper label="Description">
        <InputField
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          type="text"
        />
      </TooltipWrapper>
      <TooltipWrapper label="Price">
        <InputField
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          type="number"
        />
      </TooltipWrapper>
      <TooltipWrapper label="Current Quantity">
        <InputField
          name="currentQuantity"
          placeholder="Current Quantity"
          value={newProduct.currentQuantity}
          onChange={handleInputChange}
          type="number"
        />
      </TooltipWrapper>
      <TooltipWrapper label="Amount to Sell">
        <InputField
          name="amountToSell"
          placeholder="Amount to Sell"
          value={newProduct.amountToSell?.toString() ?? ""}
          onChange={handleInputChange}
          type="number"
        />
      </TooltipWrapper>
    </div>
  );
};

export default BasicInfoForm;
