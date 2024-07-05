"use client";

import React, { useState, useEffect } from "react";
import { OrderItemType, OrderType } from "CustomTypes";
import OrderList from "./OrderList";
import TabButtons from "./TabButtons";
import { fetchUserOrders } from "@/services/order.service";
import useAuth from "@/hooks/useAuth";
import UserWrapper from "@/components/UserWrapper";
import { Breadcrumb } from "@/components/Breadcrumb";
//font

const orderPerPage = 5;

enum OrderStatusEnum {
  Pending = "pending",
  Shipping = "shipping",
  Complete = "completed",
  Cancel = "cancelled",
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
  const [orders, setOrders] = useState<OrderType[]>([]);
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
  
  const handleOrderUpdate = (updatedOrder: OrderType) => {
    setOrders((prevOrders) => {
      if (updatedOrder.status === "cancelling") {
        return prevOrders.map((order) => 
          order.id === updatedOrder.id ? updatedOrder : order
        );
      } else if (updatedOrder.status === "cancelled") {
        return prevOrders.filter((order) => order.id !== updatedOrder.id);
      }
      return prevOrders;
    });
  };

  return (
    <UserWrapper>
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <Breadcrumb
        items={[
          { label: "Home", link: "/" },
          { label: "Purchase History", link: "/orderPurchase" },
        ]}
      />
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab as any} />
      </div>
      <OrderList orders={orders} activeTab={activeTab} isLoading={isLoading} onOrderUpdate={handleOrderUpdate}/>
    </div>
    </UserWrapper>
  );
};

export default PurchaseHistory;
