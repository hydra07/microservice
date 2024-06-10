import { useState, useRef, useEffect } from "react";
import * as ProductService from "@/services/product.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductType, ImgProductType } from "CustomTypes";
import ImageUpload from "../component/image-upload";
import NutritionForm from "./NutritionForm";
import BasicInfoForm from "./BasicInfoForm";
import ProductImageUpload from "./ProductImageUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateSchema } from "@/utils/validation.utils";
import {
  basicInfoSchema,
  nutritionFormSchema,
  BasicInfoData,
  NutritionData,
} from "@/validation/productSchema";

const initialProductState: ProductType = {
  id: 0,
  name: "",
  description: "",
  currentQuantity: 0,
  price: 0,
  imgProducts: [],
  category: { id: 0, name: "", isActive: true },
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
};

interface UpdateProductDialogProps {
  selectedProduct: ProductType | null;
  onUpdateSuccess: (updatedProduct: ProductType) => void;
}

interface ProductImageUploadHandle {
  handleUpload: () => Promise<ImgProductType[]>;
}

const UpdateProductDialog: React.FC<UpdateProductDialogProps> = ({
  selectedProduct,
  onUpdateSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const imageUploadRef = useRef<ProductImageUploadHandle>(null);
  const [uploadedImages, setUploadedImages] = useState<ImgProductType[]>([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [updatedProduct, setUpdatedProduct] = useState<ProductType>(initialProductState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setCurrentTab(0);
    }
  }, [open]);


  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleInputNumberChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleNutritionChange = (key: string, value: string) => {
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      nutrition: {
        ...prevProduct.nutrition,
        [key]: parseInt(value) || 0,
      },
    }));
  };

  const handleCategoryChange = (value: number) => {
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      category: {
        ...prevProduct.category,
        id: value,
      },
    }));
  };

  const handleMeasurementChange = (value: number) => {
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      measurement: {
        ...prevProduct.measurement,
        id: value,
      },
    }));
  };

  const handleUpdateProduct = async (productData: ProductType) => {
    try {
      //   const updatedProduct = await ProductService.updateProduct(productData);
      if (updatedProduct) {
        onUpdateSuccess(updatedProduct);
        setOpen(false);
        setUpdatedProduct(initialProductState);
        setUploadedImages([]);
        setCurrentTab(0);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      imgProducts: uploadedImages,
    }));
  }, [uploadedImages]);

  const handleUploadSuccess = (
    uploadedFilesData: { imageUrl: string; publicId: string }[]
  ) => {
    const productData = { ...updatedProduct, imgProducts: uploadedFilesData };
    handleUpdateProduct(productData);
  };

  const nextTab = () => setCurrentTab((prev) => prev + 1);
  const prevTab = () => setCurrentTab((prev) => prev - 1);

  const validateAndNextTab = () => {
    if (currentTab === 0) {
      const basicInfoData: BasicInfoData = {
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        currentQuantity: updatedProduct.currentQuantity,
        amountToSell: updatedProduct.amountToSell,
        categoryId: updatedProduct.category.id,
      };
      const { success, errors } = validateSchema(
        basicInfoSchema,
        basicInfoData
      );
      setErrors(errors);
      if (success) nextTab();
    } else if (currentTab === 1) {
      const nutritionData: NutritionData = {
        measurementId: updatedProduct.measurement.id,
        averageWeight: updatedProduct.averageWeight,
        nutrition: updatedProduct.nutrition,
      };
      const { success, errors } = validateSchema(
        nutritionFormSchema,
        nutritionData
      );
      setErrors(errors);
      if (success) nextTab();
    }
  };

  const triggerImageUpload = async () => {
    if (imageUploadRef.current) {
      setLoading(true);
      return await imageUploadRef.current.handleUpload();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Update Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold mb-2">
            Update Product
          </DialogTitle>
        </DialogHeader>

        {currentTab === 0 && (
          <div>
            <h4 className="text-gray-500 mb-4">Basic information</h4>
            <BasicInfoForm
              newProduct={updatedProduct}
              handleInputNumberChange={handleInputNumberChange}
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
              newProduct={updatedProduct}
              handleInputChange={handleInputChange}
              handleMeasurementChange={handleMeasurementChange}
              handleInputNumberChange={handleInputNumberChange}
              handleNutritionChange={handleNutritionChange}
              errors={errors}
            />
          </div>
        )}

        {currentTab === 2 && (
          <div>
            <h4 className="text-gray-500 mb-4">Media</h4>
            <ProductImageUpload
              ref={imageUploadRef}
              newProduct={updatedProduct}
              onUploadSuccess={handleUploadSuccess}
            />
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
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={triggerImageUpload}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductDialog;
