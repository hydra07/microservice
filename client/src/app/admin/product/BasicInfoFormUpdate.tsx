import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInfoData, basicInfoSchema } from "@/validation/productSchema";
import InputField from "./InputField";
import TooltipWrapper from "./TooltipWrapper";
import CategorySelect from "./CategorySelect"; // Assume you have a CategorySelect component

interface BasicInfoFormProps {
  onSubmit: (data: BasicInfoData) => void;
  defaultValues?: Partial<BasicInfoData>;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      currentQuantity: 0,
      amountToSell: 0,
      categoryId: 0,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TooltipWrapper label="Product Name">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <>
              <InputField {...field} placeholder="Product Name" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </>
          )}
        />
      </TooltipWrapper>

      <TooltipWrapper label="Description">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <>
              <InputField {...field} placeholder="Description" value={field.value || ""} />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </>
          )}
        />
      </TooltipWrapper>

      <TooltipWrapper label="Price">
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <>
              <InputField {...field} placeholder="Price" type="number" />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
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
              <InputField {...field} placeholder="Current Quantity" type="number" />
              {errors.currentQuantity && <p className="text-red-500 text-sm mt-1">{errors.currentQuantity.message}</p>}
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
              <InputField {...field} placeholder="Amount to Sell" type="number" />
              {errors.amountToSell && <p className="text-red-500 text-sm mt-1">{errors.amountToSell.message}</p>}
            </>
          )}
        />
      </TooltipWrapper>

      <TooltipWrapper label="Category">
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => (
            <>
              <CategorySelect value={field.value.toString()} onChange={field.onChange} />
              {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>}
            </>
          )}
        />
      </TooltipWrapper>

      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Next
      </button>
    </form>
  );
};

export default BasicInfoForm;
