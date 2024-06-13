import { useState } from "react";
import * as ProductCategoryService from "@/services/productCategory.service";
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
import { ProductCategoryType } from "CustomTypes";
import { set } from "date-fns";

interface CreateProductCategoryDialogProps {
  onCreateSuccess: (newCategory: ProductCategoryType) => void;
}

const CreateProductCategoryDialog: React.FC<
  CreateProductCategoryDialogProps
> = ({ onCreateSuccess }) => {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<ProductCategoryType>({
    id: 0,
    name: "",
    isActive: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleCreateCategory = async () => {
    try {
      const createdCategory =
        await ProductCategoryService.createProductCategory(newCategory);
      if (createdCategory) {
        onCreateSuccess(createdCategory);
        setOpen(false);
        setNewCategory({ id: 0, name: "", isActive: true });
      }
    } catch (error) {
      console.error("Error creating product category:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white">
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold mb-2">Create Product Category</DialogTitle>
          <DialogDescription className="text-gray-500 mb-4">
            Create a new product category.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right col-span-1 font-semibold">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="isActive" className="text-right col-span-1 font-semibold">
              Active
            </label>
            <Input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={newCategory.isActive}
              onChange={(e) =>
                setNewCategory({ ...newCategory, isActive: e.target.checked })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleCreateCategory} className="bg-green-500 hover:bg-green-600 text-white">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductCategoryDialog;
