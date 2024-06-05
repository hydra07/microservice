"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ProductType } from "CustomTypes";
// import UpdateProductDialog from "./UpdateProductDialog";

export const createColumns = (
  handleUpdateSuccess: (updatedProduct: ProductType) => void
): ColumnDef<ProductType>[] => [
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product.id.toString())
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <UpdateProductCategoryDialog
                category={productCategory}
                onUpdateSuccess={handleUpdateSuccess}
              /> */}
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "imgProducts[0].url", // Display the first image URL
    header: "Image",
    cell: ({ getValue }) => (
      <img
        src={getValue<string>() || "/placeholder.png"} // Replace with your placeholder image URL
        alt="Product Image"
        className="h-12 w-12 object-cover"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    maxSize: 20,
    enableResizing: false,
  },
  {
    accessorKey: "currentQuantity",
    header: "Current Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "is_activated",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_activated");

      return (
        <div className="flex items-center">
          <div
            className={`h-2 w-2 rounded-full mr-2 ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {isActive ? "Active" : "Inactive"}
        </div>
      );
    },
  },
];
