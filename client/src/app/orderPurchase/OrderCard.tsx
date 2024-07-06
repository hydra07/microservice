"use client";

import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  ChevronDownIcon,
  PackageIcon,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import OrderItems from "./OrderItem";
import { OrderType } from "CustomTypes";
import {
  cancelOrder,
  createCancelRequest,
  updateOrderStatus,
} from "@/services/order.service";

const OrderCard: React.FC<{
  order: OrderType;
  onOrderUpdate: (updatedOrder: OrderType) => void;
}> = ({ order, onOrderUpdate }) => {
  const handleCancel = async () => {
    try {
      let updatedOrder;
      if (order.paymentMethod === "cod") {
        updatedOrder = await updateOrderStatus(order.id, "cancelled");
      } else if (order.paymentMethod === "vnpay") {
        updatedOrder = await updateOrderStatus(order.id, "cancelling");
      }

      if (updatedOrder) {
        onOrderUpdate(updatedOrder);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg shadow-sm mb-4 overflow-hidden"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between p-3 bg-gray-50 dark:bg-slate-800">
        <div className="flex items-center space-x-2">
          <PackageIcon className="w-5 h-5 text-primary" />
          <p className="text-sm font-medium">Order #{order.id}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {format(new Date(order.createAt), "MMM d, yyyy")}
        </p>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div className="w-1/2">
            <p className="text-sm font-medium">Ship Info</p>
            <p className="text-xs text-muted-foreground">{order.name}</p>
            <p className="text-xs text-muted-foreground">{order.email}</p>
            <p className="text-xs text-muted-foreground">{order.phone}</p>
            <p className="text-xs text-muted-foreground">{order.shipAddress}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {new Intl.NumberFormat("vi", {
                style: "currency",
                currency: "VND",
              }).format(order.total)}
            </p>
            <p
              className={`text-xs ${
                order.status === "pending"
                  ? "text-yellow-500"
                  : order.status === "shipping"
                  ? "text-blue-500"
                  : order.status === "cancelling"
                  ? "text-gray-500"
                  : order.status === "cancelled"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </p>
          </div>
        </div>
        <Collapsible>
          <CollapsibleTrigger className="flex justify-between items-center w-full p-2 bg-muted hover:bg-accent transition-colors rounded">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6" />
              <p className="text-sm font-medium">Order Items</p>
            </div>
            <ChevronDownIcon className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <OrderItems items={order.orderItems} status={order.status} />
          </CollapsibleContent>
        </Collapsible>
        <div className="mt-3 flex justify-end space-x-2">
          {order.status === "pending" && (
            <Button size="sm" variant="destructive" onClick={handleCancel}>
              Cancel order
            </Button>
          )}
          {/* {order.status === "shipping" && (
            <Button size="sm" variant="outline">
              Complete
            </Button>
          )} */}
          {order.status === "cancelling" && (
            <Button disabled size="sm" variant="secondary">
              Cancelling...
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;
