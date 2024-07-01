"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import OrderCard from "./OrderCard";
import { create } from "zustand";
import { OrderItemType, OrderType } from "CustomTypes";
import OrderList from "./OrderList";
import TabButtons from "./TabButtons";
import { fetchUserOrders } from "@/services/order.service";
import useAuth from "@/hooks/useAuth";
import { User } from "lucide-react";
import UserWrapper from "@/components/UserWrapper";

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

  const { user, status } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if(user){
        const data = await fetchUserOrders(user.id, activeTab);
        setOrders(data);
        setIsLoading(false);
      }
      
    };

    fetchData();
  }, [activeTab, user]);

  return (
    <UserWrapper>
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Purchase History</h1>
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <OrderList orders={orders} activeTab={activeTab} isLoading={isLoading} />
    </div>
    </UserWrapper>
  );
};

export default PurchaseHistory;
