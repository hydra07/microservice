
import { ColumnDef } from "@tanstack/react-table";
import { ImgProductType, ProductType } from "CustomTypes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

const productImageURL =
  "https://res.cloudinary.com/djvlldzih/image/upload/v1717554614/letcook/uploads/images/product/";

export const createColumns = (
  handleUpdateSuccess: (updatedProduct: ProductType) => void,
  handleUpdateClick: (product: ProductType) => void

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
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={ () => handleUpdateClick(product) }>
              Update product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-right w-10">Title</div>,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <span className="truncate w-10 font-medium">
          {row.getValue("id")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "imgProducts",
    header: "Image",
    cell: ({ getValue }) => {
      const imgProducts = getValue<ImgProductType[]>();
      const imageUrl = imgProducts.length
        ? `${imgProducts[0].imageUrl}`
        : "https://res.cloudinary.com/djvlldzih/image/upload/v1717604827/letcook/uploads/images/yfmw7mzqplpyxcmiopuj.jpg";

      return (
        <img
          src={imageUrl}
          alt="Product Image"
          className="h-12 w-12 object-cover"
        />
      );
    },
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
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <span className="truncate w-40 font-medium">
          {row.getValue("name")}
        </span>
      </div>
    ),
    enableResizing: false,
  },
  {
    accessorKey: "currentQuantity",
    header: "Current Quantity",
    cell: ({ row }) => (
      <span className="text-gray-700 font-mono">
        {row.getValue("currentQuantity")}
      </span>
    ),
    meta: { className: 'w-[120px] text-center' },
  },
  {
    accessorKey: "price",
    header: () => <span className="font-semibold text-gray-700">Price</span>,
    cell: ({ row }) => (
      <span>
        ${Number(row.getValue("price")).toFixed(2)}
      </span>
    ),
    meta: { className: 'w-[100px] text-right' },
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