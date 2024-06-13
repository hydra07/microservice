"use client";
import React, { useState } from "react";
import * as ProductCategoryService from "@/services/productCategory.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProductCategoryType } from "CustomTypes";
import { set } from "date-fns";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface UpdateProductCategoryDialogProps {
  category: ProductCategoryType;
  onUpdateSuccess: (updatedCategory: ProductCategoryType) => void;
}

const UpdateProductCategoryDialog: React.FC<UpdateProductCategoryDialogProps> = ({
   category, 
   onUpdateSuccess
 }) => {
  const [open, setOpen] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState<ProductCategoryType>({
    ...category,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedCategory({ ...updatedCategory, [e.target.name]: e.target.value });
  };

  const handleUpdateCategory = async () => {
    if (updatedCategory) {
      try {
        const updatedCategoryResult =
          await ProductCategoryService.updateProductCategory(updatedCategory);
        if (updatedCategoryResult) {
          onUpdateSuccess(updatedCategoryResult);
          setOpen(false);
          setUpdatedCategory({ ...category });
        }
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    }
  };

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
      </DropdownMenuItem>{" "}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => setOpenDialog(true)}
        >
          Update
        </Button>
      </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px] p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-2">
              Update Product Category
            </DialogTitle>
            <DialogDescription className="text-gray-500 mb-4">
              Update the product category information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="name"
                className="text-right col-span-1 font-semibold"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={updatedCategory.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="isActive"
                className="text-right col-span-1 font-semibold"
              >
                Active
              </label>
              <Input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={updatedCategory.isActive}
                onChange={(e) =>
                  setUpdatedCategory({
                    ...updatedCategory,
                    isActive: e.target.checked,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateCategory}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProductCategoryDialog;
