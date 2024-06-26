"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
const IMAGE_NOT_FOUND = process.env.NEXT_PUBLIC_IMG_NOTFOUND as string;

export default function PurchaseHistory() {
  const [activeTab, setActiveTab] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const ordersPerPage = 5;

  // Simulated orders data
  const orders = [
    {
      id: "ORD001",
      date: "2023-05-15",
      total: 99.99,
      status: "pending",
      items: [
        {
          name: "Product A",
          quantity: 1,
          price: 49.99,
          image: "/placeholder.svg",
        },
        {
          name: "Product B",
          quantity: 1,
          price: 49.99,
          image: "/placeholder.svg",
        },
      ],
    },
    {
      id: "ORD002",
      date: "2023-04-20",
      total: 149.99,
      status: "shipping",
      items: [
        {
          name: "Product C",
          quantity: 1,
          price: 149.99,
          image: "/placeholder.svg",
        },
      ],
    },
    {
      id: "ORD003",
      date: "2023-03-01",
      total: 79.98,
      status: "complete",
      items: [
        {
          name: "Product D",
          quantity: 2,
          price: 39.99,
          image: "/placeholder.svg",
        },
      ],
    },
    {
      id: "ORD004",
      date: "2023-02-10",
      total: 199.98,
      status: "pending",
      items: [
        {
          name: "Product E",
          quantity: 2,
          price: 99.99,
          image: "/placeholder.svg",
        },
        {
          name: "Product F",
          quantity: 1,
          price: 49.99,
          image: "/placeholder.svg",
        },
      ],
    },
    {
      id: "ORD005",
      date: "2023-01-01",
      total: 299.97,
      status: "shipping",
      items: [
        {
          name: "Product G",
          quantity: 3,
          price: 99.99,
          image: "/placeholder.svg",
        },
      ],
    },
  ];

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const Spinner = () => (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Purchase History</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {["pending", "shipping", "complete"].map((status) => (
            <Button
              key={status}
              variant={activeTab === status ? "default" : "outline"}
              onClick={() => setActiveTab(status)}
              role="tab"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <Spinner />
          <p className="mt-2">Loading orders...</p>
        </div>
      ) : currentOrders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">No {activeTab} orders found.</p>
        </div>
      ) : (
        <div className="border rounded-lg shadow-sm">
          {currentOrders.map((order) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={order.id}
              className="border-b last:border-b-0"
            >
              <div className="flex justify-between items-center p-4">
                <div>
                  <p className="text-lg font-medium">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(order.date), "MMM d, yyyy")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">
                    ${order.total.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm ${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "shipping"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </p>
                </div>
              </div>
              <Collapsible>
                <CollapsibleTrigger className="flex justify-between items-center p-4 bg-muted hover:bg-accent transition-colors w-full">
                  <p className="text-sm font-medium">Order Items</p>
                  <ChevronDownIcon className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-gray-50">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Image
                          src={IMAGE_NOT_FOUND}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-grow">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </div>
      )}

      {filteredOrders.length > ordersPerPage && (
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="mx-4 flex items-center">Page {currentPage}</span>
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={indexOfLastOrder >= filteredOrders.length}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
