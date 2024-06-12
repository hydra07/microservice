// BasicInfoFormUpdate.tsx
import React from "react";
import { Controller } from "react-hook-form";
import { ProductFormData } from "@/validation/productSchema";
import TooltipWrapper from "./TooltipWrapper";
import CategorySelect from "./CategorySelect";
import InputField from "./InputField";

interface BasicInfoFormProps {
  control: any;
  errors: any;
}

const BasicInfoFormUpdate: React.FC<BasicInfoFormProps> = ({
  control,
  errors,
}) => {
  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <>
            <CategorySelect
              value={field.value.toString()}
              onChange={(value) => field.onChange(parseInt(value))}
            />
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </>
        )}
      />

      <TooltipWrapper label="Product Name">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <>
              <InputField
                {...field}
                type="text"
                placeholder="Product Name"
                // className="w-full p-2 border rounded"
                // onClick={(e) => e.stopPropagation()}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.name.message}
                </p>
              )}
            </>
          )}
        />
      </TooltipWrapper>

      <TooltipWrapper label="Description">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <InputField
              {...field}
              type="text"
              placeholder="Description"
              // className="w-full p-2 border rounded"
              // onClick={(e) => e.stopPropagation()}
            />
          )}
        />
      </TooltipWrapper>

      <TooltipWrapper label="Price">
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <>
              <InputField
                {...field}
                onChange={(e) => { field.onChange(parseFloat(e.target.value)) }}
                type="number"
                placeholder="Price"
                // className="w-full p-2 border rounded"
                // onClick={(e) => e.stopPropagation()}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.price.message}
                </p>
              )}
            </>
          )}
        />
      </TooltipWrapper>

      <TooltipWrapper label="Current Quantity">
        <Controller
          control={control}
          name="currentQuantity"
          render={({ field }) => (
            <>
              <InputField
                {...field}
                onChange={(e) => { field.onChange(parseInt(e.target.value)) }}
                type="number"
                placeholder="Current Quantity"
                // className="w-full p-2 border rounded"
                // onClick={(e) => e.stopPropagation()}
              />
              {errors.currentQuantity && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.currentQuantity.message}
                </p>
              )}
            </>
          )}
        />
      </TooltipWrapper>

      <TooltipWrapper label="Amount to Sell">
        <Controller
          control={control}
          name="amountToSell"
          render={({ field }) => (
            <>
              <InputField
                {...field}
                type="number"
                placeholder="Amount to Sell"
                // className="w-full p-2 border rounded"
                // onClick={(e) => e.stopPropagation()}
                onChange={(e) => { field.onChange(parseFloat(e.target.value)) }}

                
              />
              {errors.amountToSell && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.amountToSell.message}
                </p>
              )}
            </>
          )}
        />
      </TooltipWrapper>
    </div>
  );
};

export default BasicInfoFormUpdate;