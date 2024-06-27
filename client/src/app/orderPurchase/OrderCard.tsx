"use client";

import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import OrderItems from "./OrderItem";
import { OrderType } from "CustomTypes";

const OrderCard: React.FC<{ order: OrderType }> = ({ order }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b last:border-b-0"
    >
      <div className="flex justify-between p-4">
        <div>
          <p className="text-lg font-medium">Order #{order.id}</p>
          <p className="text-sm text-muted-foreground">
            {format(new Date(order.createAt), "MMM d, yyyy")}
          </p>
        </div>
        <div>
          <p className="text-lg font-medium">Ship Info</p>
          <p className="text-sm text-muted-foreground">Peter</p>
          <p className="text-sm text-muted-foreground">pett@gmail.com</p>
          <p className="text-sm text-muted-foreground">0978787666</p>
          <p className="text-sm text-muted-foreground">123 sanFrabsisco</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium">${order.total.toFixed(2)}</p>
          <p
            className={`text-sm ${
              order.status === "pending"
                ? "text-yellow-500"
                : order.status === "shipping"
                ? "text-blue-500"
                : "text-green-500"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </p>
        </div>
    
      </div>
      <Collapsible>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger className="flex justify-between items-center p-4 bg-muted hover:bg-accent transition-colors">
            <p className="text-sm font-medium">Order Items</p>
            <ChevronDownIcon className="w-4 h-4" />
          </CollapsibleTrigger>
          {order.status === "pending" && (
            <Button className="bg-red-400 hover:bg-red-500 mr-2">Cancel order</Button>
          )}
          {order.status === "shipping" && (
            <Button className="bg-green-400 hover:bg-green-500 mr-2" variant="outline">
              Complete
            </Button>
          )}
        </div>
        <CollapsibleContent className="p-4 bg-gray-50">
          <OrderItems items={order.items} />
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

export default OrderCard;
