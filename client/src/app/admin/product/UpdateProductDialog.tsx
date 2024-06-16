import React, { useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ProductService from "@/services/product.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductType, ImgProductType } from "CustomTypes";
import BasicInfoFormUpdate from "./BasicInfoFormUpdate";
import NutritionFormUpdate from "./NutritionFormUpdate";
import UpdateImage from "./UpdateImage";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { productSchema, ProductFormData } from "@/validation/productSchema";

interface UpdateProductDialogProps {
  selectedProduct: ProductType;
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
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageUploadRef = useRef<ProductImageUploadHandle>(null);

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: selectedProduct.price,
      currentQuantity: selectedProduct.currentQuantity,
      amountToSell: selectedProduct.amountToSell,
      categoryId: selectedProduct.category.id,
      measurementId: selectedProduct.measurement.id,
      averageWeight: selectedProduct.averageWeight,
      nutrition: selectedProduct.nutrition,
      imgProducts: selectedProduct.imgProducts,
    },
  });

  const {
    control,
    formState: { errors },
    setValue,
    trigger,
    register,
  } = methods;

  const onSubmit = async () => {
    try {
      setLoading(true);
      const values = methods.getValues();
      console.log("Form values:", values);

      const uploadedImages = await triggerImageUpload().then((images) =>
        images.map((image) => ({
          ImageUrl: image.imageUrl,
          publicId: image.publicId,
          id: image.id,
        }))
      );

      const updatedProduct = {
        ...selectedProduct,
        ...values,
        imgProducts: uploadedImages.map((image) => ({
          imageUrl: image.ImageUrl,
          publicId: image.publicId,
          id: image.id,
        })),
      };

      const data = await ProductService.updateProduct(updatedProduct);
      if (data) {
        onUpdateSuccess(data);
      }else{
        console.log("Error updating product:", data);
      }
      
      setOpen(false);
    } catch (error) { 
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };


  // const handleUploadSuccess = (
  //   uploadedFilesData: { imageUrl: string; publicId: string }[]
  // ) => {
  //   const productData = { ...newProduct, imgProducts: uploadedFilesData };
  //   handleCreateProduct(productData);
  // };


  const triggerImageUpload = async () => {
    if (imageUploadRef.current) {
      return await imageUploadRef.current.handleUpload();
    }
    return [];
  };

  const nextTab = async () => {
    const valid = await trigger();
    if (valid) {
      setCurrentTab((prev) => prev + 1);
    }
  };
  
  const prevTab = () => setCurrentTab((prev) => prev - 1);

  return (
    <>
      <DropdownMenuItem
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
      >
        Update
      </DropdownMenuItem>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-2">
              Update Product
            </DialogTitle>
          </DialogHeader>

          <FormProvider {...methods}>
            {currentTab === 0 && (
              <div>
                <h4 className="text-gray-500 mb-4">Basic information</h4>
                <BasicInfoFormUpdate control={control} errors={errors} />
              </div>
            )}

            {currentTab === 1 && (
              <div>
                <h4 className="text-gray-500 mb-4">Nutrition information</h4>
                <NutritionFormUpdate control={control} errors={errors}  register={register}/>
              </div>
            )}

            {currentTab === 2 && (
              <div>
                <h4 className="text-gray-500 mb-4">Media</h4>
                <UpdateImage
                  newProduct={selectedProduct}
                  ref={imageUploadRef}
                  onUploadSuccess={(images) => setValue("imgProducts", images)}
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
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={loading}
                  onClick={onSubmit}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              )}
            </DialogFooter>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProductDialog;
