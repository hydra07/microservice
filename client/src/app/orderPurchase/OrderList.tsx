"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import OrderCard from "./OrderCard";
import { OrderType } from "CustomTypes";
import { Spinner } from "@/components/ui/spinner";


const ordersPerPage = 5;
interface OrderListProps {
    orders: OrderType[];
    activeTab: string;
    isLoading: boolean;
}

const OrderList: React.FC<OrderListProps> = ({ orders, activeTab, isLoading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const filteredOrders = orders;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const Spriner = () => (
        <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
                <OrderCard key={order.id} order={order} />
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

export default OrderList;