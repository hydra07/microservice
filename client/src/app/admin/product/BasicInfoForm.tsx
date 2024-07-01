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
    <div className="space-y-6 space-x-4">
      <div className="relative pb-5">
        <CategorySelect
          value={newProduct.category.id ? newProduct.category.id.toString() : ""}
          onChange={(value) => handleCategoryChange(parseInt(value || "0"))}
        />
        {errors.categoryId && (
          <p className="absolute bottom-0 left-0 text-red-500 text-sm">{errors.categoryId}</p>
        )}
      </div>

      <TooltipWrapper label="Product Name">
        <div className="relative pb-5">
          <InputField
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            type="text"
          />
          {errors.name && (
            <p className="absolute bottom-0 left-0 text-red-500 text-sm">{errors.name}</p>
          )}
        </div>
      </TooltipWrapper>

      <TooltipWrapper label="Description">
        <div className="relative pb-5">
          <InputField
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            type="text"
          />
        </div>
      </TooltipWrapper>

      <TooltipWrapper label="Price">
        <div className="relative pb-5">
          <InputField
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputNumberChange}
            type="number"
          />
          {errors.price && (
            <p className="absolute bottom-0 left-0 text-red-500 text-sm">{errors.price}</p>
          )}
        </div>
      </TooltipWrapper>

      <TooltipWrapper label="Current Quantity">
        <div className="relative pb-5">
          <InputField
            name="currentQuantity"
            placeholder="Current Quantity"
            value={newProduct.currentQuantity}
            onChange={handleInputNumberChange}
            type="number"
          />
          {errors.currentQuantity && (
            <p className="absolute bottom-0 left-0 text-red-500 text-sm">{errors.currentQuantity}</p>
          )}
        </div>
      </TooltipWrapper>

      <TooltipWrapper label="Amount to Sell">
        <div className="relative pb-5">
          <InputField
            name="amountToSell"
            placeholder="Amount to Sell"
            value={newProduct.amountToSell}
            onChange={handleInputNumberChange}
            type="number"
          />
          {errors.amountToSell && (
            <p className="absolute bottom-0 left-0 text-red-500 text-sm">{errors.amountToSell}</p>
          )}
        </div>
      </TooltipWrapper>
    </div>
  );
};

export default BasicInfoForm;