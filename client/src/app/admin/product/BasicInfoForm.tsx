import React from "react";
import { ProductType } from "CustomTypes";
import InputField from "./InputField";
import TooltipWrapper from "./TooltipWrapper";
import CategorySelect from "./CategorySelect";

interface BasicInfoFormProps {
  newProduct: ProductType;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCategoryChange: (value: number) => void;
  errors: Record<string, string>;
  handleInputNumberChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  newProduct,
  handleInputChange,
  handleCategoryChange,
  handleInputNumberChange,
  errors,
}) => {
  return (
    <div className="space-y-4">
      <CategorySelect
        value={newProduct.category.id ? newProduct.category.id.toString() : ""}
        onChange={(value) => handleCategoryChange(parseInt(value || "0"))}
      />
      {errors.categoryId && (
        <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
      )}

      <TooltipWrapper label="Product Name">
        <InputField
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          type="text"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 text-left">{errors.name}</p>
        )}
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
          onChange={handleInputNumberChange}
          type="number"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </TooltipWrapper>

      <TooltipWrapper label="Current Quantity">
        <InputField
          name="currentQuantity"
          placeholder="Current Quantity"
          value={newProduct.currentQuantity}
          onChange={handleInputNumberChange}
          type="number"
        />
        {errors.currentQuantity && (
          <p className="text-red-500 text-sm mt-1">{errors.currentQuantity}</p>
        )}
      </TooltipWrapper>

      <TooltipWrapper label="Amount to Sell">
        <InputField
          name="amountToSell"
          placeholder="Amount to Sell"
          value={newProduct.amountToSell}
          onChange={handleInputNumberChange}
          type="number"
        />
        {errors.amountToSell && (
          <p className="text-red-500 text-sm mt-1">{errors.amountToSell}</p>
        )}
      </TooltipWrapper>
    </div>
  );
};

export default BasicInfoForm;
