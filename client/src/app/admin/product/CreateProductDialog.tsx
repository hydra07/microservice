import { useState } from "react";
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
import NutritionForm from "./NutritionForm"; "./NutritionForm";
import BasicInfoForm from "./BasicInfoForm";

interface CreateProductDialogProps {
  onCreateSuccess: (newProduct: ProductType) => void;
}

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  onCreateSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<
    { imageUrl: string; publicId: string }[]
  >([]);
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
    amountToSell: null,
    averageWeight: 0,
    measurement: { id: 0, name: "" },
    nutrition: {
      calories: 0,
      sugar: 0,
      fat: 0,
      sodium: 0,
      carbs: 0,
      fiber: 0,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // const handleMeasurementChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = e.target;
  //   setNewProduct((prevProduct) => ({
  //     ...prevProduct,
  //     measurement: {
  //       ...prevProduct.measurement,
  //       [name]: value,
  //     },
  //   }));
  // };

  const handleNutritionChange = (key: string, value: string) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      nutrition: {
        ...prevProduct.nutrition,
        [key]: parseInt(value) || 0,
      },
    }));
  };
  const handleCategoryChange = (value: string) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      category: {
        ...prevProduct.category,
        id: value,
      },
    }));
  };

  const handleMeasurementChange = (value: string) => {
    // setNewProduct((prevProduct) => ({
    //   ...prevProduct,
    //   measurement: {
    //     ...prevProduct.measurement,
    //     id: value,
    //   },
    // }));
  }

  const handleCreateProduct = async () => {
    try {
      const productData = { ...newProduct, imgProducts: uploadedImages };
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
          amountToSell: null,
          averageWeight: 0,
          measurement: { id: 0, name: "" },
          nutrition: {
            calories: 0,
            sugar: 0,
            fat: 0,
            sodium: 0,
            carbs: 0,
            fiber: 0,
          },
        });
        setUploadedImages([]);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleUploadSuccess = (
    uploadedFilesData: { imageUrl: string; publicId: string }[]
  ) => {
    const imgProductsData = uploadedFilesData.map((file) => ({
      imageUrl: file.imageUrl,
      publicId: file.publicId,
      productId: 0, // This will be set by the backend when creating the product
    }));
    setUploadedImages(imgProductsData);
  };

  const nextTab = () => setCurrentTab((prev) => prev + 1);
  const prevTab = () => setCurrentTab((prev) => prev - 1);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Create Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold mb-2">
            Create Product
          </DialogTitle>
        </DialogHeader>

        {currentTab === 0 && (
          <div>
            <h4 className="text-gray-500 mb-4">Basic information</h4>
            <BasicInfoForm
              newProduct={newProduct}
              handleInputChange={handleInputChange}
              handleCategoryChange={handleCategoryChange}
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
            />
          </div>
        )}

        {currentTab === 2 && (
          <div>
            <h4 className="text-gray-500 mb-4">Media</h4>
            <ImageUpload onUploadSuccess={handleUploadSuccess} />
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
              onClick={nextTab}
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