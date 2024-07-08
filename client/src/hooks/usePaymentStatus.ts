// usePaymentStatus.ts

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCartStore } from "@/store/useCartStore";
import { createOrder } from "@/services/order.service";

const API_BASE_URL = "http://localhost:3000";

export const usePaymentStatus = (queryString: string) => {
  const { checkoutPayload, clearCart } = useCartStore();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!queryString) {
      setStatus("error");
      return;
    }

    const verifyPayment = async () => {
      setStatus("processing");
      try {
        const response = await axios.get(`${API_BASE_URL}/api/vnpay_return?${queryString}`);
        if (response.data.code === "00") {
          setStatus("success");
          const orderData = {
            ...checkoutPayload,
            paymentMethod: 'vnpay',
            id: response.data.orderId,
          };
          const order = await createOrder(orderData);
          if (order) {
            clearCart();
          }
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [queryString, checkoutPayload, clearCart]);

  return status;
};