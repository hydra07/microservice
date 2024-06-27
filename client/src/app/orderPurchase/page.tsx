"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import OrderCard from "./OrderCard";
import { create } from "zustand";
import { OrderItemType, OrderType } from "CustomTypes";
import { fetchOrders } from "./fetchOrders";
import OrderList from "./OrderList";
import TabButtons from "./TabButtons";

const orderPerPage = 5;

enum OrderStatusEnum {
  Pending = "pending",
  Shipping = "shipping",
  Complete = "complete",
}

interface OrderListProps {
  orders: OrderType[];
  activeTab: OrderStatusEnum;
}

const PurchaseHistory  = () => {
  const [activeTab, setActiveTab] = useState<OrderStatusEnum>(
    OrderStatusEnum.Pending
  );
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedOrders = await fetchOrders(activeTab);
      setOrders(fetchedOrders as never);
      setIsLoading(false);
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Purchase History</h1>
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <OrderList orders={orders} activeTab={activeTab} isLoading={isLoading} />
    </div>
  );
};

export default PurchaseHistory;
