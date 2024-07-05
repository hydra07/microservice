import { ColumnDef } from "@tanstack/react-table";
import { OrderType } from "CustomTypes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Check, MoreHorizontal } from "lucide-react";
import OrderDetailDialog from "./OrderDetailDialog";
import RejectOrderDialog from "./RejectOrderDialog";
import { updateOrderStatus } from "@/services/order.service";
export const createColumns = (
  handleUpdateSuccess: (updatedOrder: OrderType) => void
): ColumnDef<OrderType>[] => [
  {
    id: "actions",
    size: 40,
    cell: ({ row }) => {
      const order = row.original;
      const handleAcceptOrder = async (event: Event) => {
        event.preventDefault();
        try {
          const updatedOrder = await updateOrderStatus(order.id, "shipping");
          handleUpdateSuccess(updatedOrder);
        } catch (error) {
          console.error("Failed to accept order:", error);
          // You might want to show an error message to the user here
        }
      };

      const handleCompleteOrder = async (event: Event) => {
        event.preventDefault();
        try {
          const updatedOrder = await updateOrderStatus(order.id, "completed");
          handleUpdateSuccess(updatedOrder);
        } catch (error) {
          console.error("Failed to complete order:", error);
          // You might want to show an error message to the user here
        }
      };

      


      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(order.id.toString())
                }
              >
                Copy order ID
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <OrderDetailDialog
                selectedOrder={order}
              />
              <DropdownMenuSeparator />

              {order.status === "shipping" && (
                <DropdownMenuItem   
                  onSelect={handleCompleteOrder} 
                  className="text-orange-500 hover:text-orange-700 hover:bg-orange-100 focus:bg-orange-100 focus:text-orange-700 font-bold"
                >
                  <span>
                    Complete
                  </span>
                </DropdownMenuItem>
              )}
              {order.status === "pending" && (
                <DropdownMenuItem
                  onSelect={handleAcceptOrder}
                  className="text-green-500 hover:text-green-700 hover:bg-green-100 focus:bg-green-100 focus:text-green-700 font-bold"
                >
                  <Check className="mr-2 h-4 w-4" />
                  <span>Accept</span>
                </DropdownMenuItem>
              )}
              {order.status === "pending" && (
                <RejectOrderDialog
                  selectedOrder={order}
                  onRejectSuccess={handleUpdateSuccess}
                />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-right">ID</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("id")}</div>
    ),
    size: 60,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-right">Customer</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("name")}</div>
    ),
    size: 60,
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-full justify-center"
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {new Date(row.getValue("createAt")).toLocaleDateString()}
      </div>
    ),
    size: 120,
  },
  {
    accessorKey: "shipDate",
    header: () => <div className="text-center">Ship Date</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("shipDate")
          ? new Date(row.getValue("shipDate")).toLocaleDateString()
          : "N/A"}
      </div>
    ),
    size: 120,
  },
  {
    accessorKey: "userId",
    header: () => <div className="text-center">User ID</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("userId")}</div>
    ),
    size: 100,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("status")}</div>
    ),
    size: 100,
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {new Intl.NumberFormat("vi", {
          style: "currency",
          currency: "VND",
        }).format(row.getValue("total"))}
      </div>
    ),
    size: 120,
  },
];
