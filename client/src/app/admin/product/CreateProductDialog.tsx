import { useState, useRef, use, useEffect } from "react";
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
("./NutritionForm");
import BasicInfoForm from "./BasicInfoForm";
import ProductImageUpload from "./ProductImageUpload";

interface CreateProductDialogProps {
  onCreateSuccess: (newProduct: ProductType) => void;
}

interface ProductImageUploadHandle {
  handleUpload: () => Promise<ImgProductType[]>; // Now returns a promise
}

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  onCreateSuccess,
}) => {
  const [open, setOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const imageUploadRef = useRef<ProductImageUploadHandle>(null); // Create a ref

  const [uploadedImages, setUploadedImages] = useState<ImgProductType[]>([]);

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

  const handleMeasurementChange = (value: number) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      measurement: {
        ...prevProduct.measurement,
        id: value,
      },
    }));
  };

  const handleCreateProduct = async (productData : ProductType) => {
  
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
        setUploadedImages([]);
        setCurrentTab(0);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      imgProducts: uploadedImages,
    }));
  }, [uploadedImages]);



  const handleUploadSuccess = (
    uploadedFilesData: { imageUrl: string; publicId: string }[]
  ) => {
    // console.log(uploadedFilesData, "set img");
    // setUploadedImages(uploadedFilesData);
    // setNewProduct((prevProduct) => ({
    //   ...prevProduct,
    //   imgProducts: uploadedFilesData,
    // }));
    const productData = { ...newProduct, imgProducts: uploadedFilesData };
    handleCreateProduct(productData);
  };

  const nextTab = () => setCurrentTab((prev) => prev + 1);
  const prevTab = () => setCurrentTab((prev) => prev - 1);

  const triggerImageUpload = async () => {
    if (imageUploadRef.current) {
      return await imageUploadRef.current.handleUpload(); // Await the handleUpload function
    }
  };

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
            {/* <ImageUpload onUploadSuccess={handleUploadSuccess} /> */}
            <ProductImageUpload
              ref={imageUploadRef}
              newProduct={newProduct}
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
              onClick={nextTab}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              // onClick={handleCreateProduct}
              onClick={triggerImageUpload}
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
