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
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductCategoryType, ProductType } from "CustomTypes";
import { set } from "date-fns";

interface CreateProductDialogProps {
  onCreateSuccess: (newProduct: ProductType) => void;
}

const CreateProductDialog : React.FC<
CreateProductDialogProps
> = ({ onCreateSuccess }) => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductType>({
    id: 0,
    name: '',
    description: '',
    currentQuantity: 0,
    price: 0,
    imgProducts: [],
    category: { id: '', name: '', isActive: true }, // Assuming this is the structure of ProductCategoryType
    is_activated: true,
    amountToSell: null,
    averageWeight: 0,
    measurementId: 0,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleCreateProduct = async () => {
    try {
      const createdProduct = await ProductService.createProduct(newProduct);
      if (createdProduct) {
        onCreateSuccess(createdProduct);
        setOpen(false);
        setNewProduct({
          id: 0,
          name: '',
          description: '',
          currentQuantity: 0,
          price: 0,
          imgProducts: [],
          category: { id: '', name: '', isActive: true },
          is_activated: true,
          amountToSell: null,
          averageWeight: 0,
          measurementId: 0,
          nutrition: {
            calories: 0,
            sugar: 0,
            fat: 0,
            sodium: 0,
            carbs: 0,
            fiber: 0,
          },
        });
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
        Create Product
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] p-6">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold mb-2">Create Product</DialogTitle>
        <DialogDescription className="text-gray-500 mb-4">
          Create a new product.
        </DialogDescription>
      </DialogHeader>
      {/* Add input fields for ProductType properties */}
      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={() => setOpen(false)} className="mr-2">
          Cancel
        </Button>
        <Button onClick={handleCreateProduct} className="bg-green-500 hover:bg-green-600 text-white">
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  );
};

export default CreateProductDialog;
