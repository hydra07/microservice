// validationUtils.ts
import { z } from 'zod';

export const validateSchema = <T>(schema: z.ZodSchema<T>, data: T) => {
  try {
    schema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, err) => {
        acc[err.path.join('.')] = err.message;
        return acc;
      }, {} as Record<string, string>);
      return { success: false, errors };
    }
    return { success: false, errors: { _form: "Unknown error" } };
  }
};



/*
import React, { useState, useRef } from "react";
import BasicInfoForm from "./BasicInfoForm";
import NutritionForm from "./NutritionForm";
import ProductImageUpload from "./ProductImageUpload";
import { ProductType, ImgProductType } from "CustomTypes";
import { validateSchema } from "./validationUtils";
import { basicInfoSchema, nutritionFormSchema, BasicInfoData, NutritionData } from "./productSchema";

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({ onCreateSuccess }) => {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [newProduct, setNewProduct] = useState<ProductType>({
    id: 0,
    name: "",
    description: "",
    currentQuantity: 0,
    price: 0,
    imgProducts: [],
    category: { id: "", name: "", isActive: true },
    is_activated: true,
    amountToSell: 0,
    averageWeight: 0,
    measurement: { id: 0, unit: "" },
    nutrition: {
      calories: 0,
      sugar: 0,
      fat: 0,
      sodium: 0,
      carbs: 0,
      fiber: 0,
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const imageUploadRef = useRef<ProductImageUploadHandle>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "currentQuantity" || name === "amountToSell" || name === "averageWeight"
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleNutritionChange = (key: string, value: string) => {
    setNewProduct((prev) => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        [key]: parseInt(value) || 0,
      },
    }));
  };

  const handleCategoryChange = (value: string) => {
    setNewProduct((prev) => ({
      ...prev,
      category: {
        ...prev.category,
        id: value,
      },
    }));
  };

  const handleMeasurementChange = (value: number) => {
    setNewProduct((prev) => ({
      ...prev,
      measurement: {
        ...prev.measurement,
        id: value,
      },
    }));
  };

  const validateAndNextTab = () => {
    if (currentTab === 0) {
      const basicInfoData: BasicInfoData = {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        currentQuantity: newProduct.currentQuantity,
        amountToSell: newProduct.amountToSell,
        categoryId: newProduct.category.id,
      };
      const { success, errors } = validateSchema(basicInfoSchema, basicInfoData);
      setErrors(errors);
      if (success) nextTab();
    } else if (currentTab === 1) {
      const nutritionData: NutritionData = {
        measurementId: newProduct.measurement.id.toString(),
        averageWeight: newProduct.averageWeight,
        nutrition: newProduct.nutrition,
      };
      const { success, errors } = validateSchema(nutritionFormSchema, nutritionData);
      setErrors(errors);
      if (success) nextTab();
    }
  };

  const nextTab = () => setCurrentTab((prev) => prev + 1);
  const prevTab = () => setCurrentTab((prev) => prev - 1);

  const handleCreateProduct = async () => {
    const uploadedImages = await imageUploadRef.current?.handleUpload();

    const productData = {
      ...newProduct,
      imgProducts: uploadedImages || [],
    };

    try {
      const createdProduct = await ProductService.createProduct(productData);
      if (createdProduct) {
        onCreateSuccess(createdProduct);
        setOpen(false);
        setNewProduct({
          id: 0,
          name: "",
          description: "",
          currentQuantity: 0,
          price: 0,
          imgProducts: [],
          category: { id: "", name: "", isActive: true },
          is_activated: true,
          amountToSell: 0,
          averageWeight: 0,
          measurement: { id: 0, unit: "" },
          nutrition: {
            calories: 0,
            sugar: 0,
            fat: 0,
            sodium: 0,
            carbs: 0,
            fiber: 0,
          },
        });
        setCurrentTab(0);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
          Create Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold mb-2">Create Product</DialogTitle>
        </DialogHeader>

        {currentTab === 0 && (
          <div>
            <h4 className="text-gray-500 mb-4">Basic information</h4>
            <BasicInfoForm
              newProduct={newProduct}
              handleInputChange={handleInputChange}
              handleCategoryChange={handleCategoryChange}
              errors={errors}
            />
          </div>
        )}

        {currentTab === 1 && (
          <div>
            <h4 className="text-gray-500 mb-4">Nutrition information</h4>
            <NutritionForm
              newProduct={newProduct}
              handleInputChange={handleInputChange}
              handleMeasurementChange={handleMeasurementChange}
              handleNutritionChange={handleNutritionChange}
              errors={errors}
            />
          </div>
        )}

        {currentTab === 2 && (
          <div>
            <h4 className="text-gray-500 mb-4">Media</h4>
            <ProductImageUpload ref={imageUploadRef} />
          </div>
        )}

        <DialogFooter className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={prevTab}
            disabled={currentTab === 0}
            className="mr-2"
          >
            Previous
          </Button>
          {currentTab < 2 ? (
            <Button
              onClick={validateAndNextTab}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleCreateProduct}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Create
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
*/


/*
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
  handleCategoryChange: (value: string) => void;
  errors: Record<string, string>;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  newProduct,
  handleInputChange,
  handleCategoryChange,
  errors,
}) => {
  return (
    <div className="space-y-4">
      <CategorySelect
        value={newProduct.category.id}
        onChange={handleCategoryChange}
      />
      {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}

      <TooltipWrapper label="Product Name">
        <InputField
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          type="text"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </TooltipWrapper>

      <TooltipWrapper label="Current Quantity">
        <InputField
          name="currentQuantity"
          placeholder="Current Quantity"
          value={newProduct.currentQuantity}
          onChange={handleInputChange}
          type="number"
        />
        {errors.currentQuantity && <p className="text-red-500 text-sm mt-1">{errors.currentQuantity}</p>}
      </TooltipWrapper>

      <TooltipWrapper label="Amount to Sell">
        <InputField
          name="amountToSell"
          placeholder="Amount to Sell"
          value={newProduct.amountToSell?.toString() ?? ""}
          onChange={handleInputChange}
          type="number"
        />
        {errors.amountToSell && <p className="text-red-500 text-sm mt-1">{errors.amountToSell}</p>}
      </TooltipWrapper>
    </div>
  );
};

export default BasicInfoForm;
*/

/*
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
  handleMeasurementChange: (value: number) => void;
  handleNutritionChange: (key: string, value: string) => void;
  errors: Record<string, string>;
}

const NutritionForm: React.FC<NutritionFormProps> = ({
  newProduct,
  handleInputChange,
  handleMeasurementChange,
  handleNutritionChange,
  errors,
}) => {
  return (
    <div className="space-y-4">
      <MeasurementSelect
        value={newProduct.measurement.id ? newProduct.measurement.id.toString() : ""}
        onChange={(value) => handleMeasurementChange(parseInt(value))}
      />
      {errors.measurementId && <p className="text-red-500 text-sm mt-1">{errors.measurementId}</p>}

      <TooltipWrapper label="Average Weight">
        <InputField
          name="averageWeight"
          placeholder="Average Weight"
          type="number"
          value={newProduct.averageWeight.toString()}
          onChange={handleInputChange}
        />
        {errors['averageWeight'] && <p className="text-red-500 text-sm mt-1">{errors['averageWeight']}</p>}
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
          {errors[`nutrition.${key}`] && <p className="text-red-500 text-sm mt-1">{errors[`
*/