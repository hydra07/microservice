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
    <div className="space-y-6 space-x-4">
      <div className="relative pb-5">
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
                <p className="absolute bottom-0 left-0 text-red-500 text-sm">
                  {errors.categoryId.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <TooltipWrapper label="Product Name">
        <div className="relative pb-5">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <>
                <InputField
                  {...field}
                  type="text"
                  placeholder="Product Name"
                />
                {errors.name && (
                  <p className="absolute bottom-0 left-0 text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </TooltipWrapper>

      <TooltipWrapper label="Description">
        <div className="relative pb-5">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <InputField
                {...field}
                type="text"
                placeholder="Description"
              />
            )}
          />
        </div>
      </TooltipWrapper>

      <TooltipWrapper label="Price">
        <div className="relative pb-5">
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
                />
                {errors.price && (
                  <p className="absolute bottom-0 left-0 text-red-500 text-sm">
                    {errors.price.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </TooltipWrapper>

      <TooltipWrapper label="Current Quantity">
        <div className="relative pb-5">
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
                />
                {errors.currentQuantity && (
                  <p className="absolute bottom-0 left-0 text-red-500 text-sm">
                    {errors.currentQuantity.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </TooltipWrapper>

      <TooltipWrapper label="Amount to Sell">
        <div className="relative pb-5">
          <Controller
            control={control}
            name="amountToSell"
            render={({ field }) => (
              <>
                <InputField
                  {...field}
                  type="number"
                  placeholder="Amount to Sell"
                  onChange={(e) => { field.onChange(parseFloat(e.target.value)) }}
                />
                {errors.amountToSell && (
                  <p className="absolute bottom-0 left-0 text-red-500 text-sm">
                    {errors.amountToSell.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </TooltipWrapper>
    </div>
  );
};

export default BasicInfoFormUpdate;