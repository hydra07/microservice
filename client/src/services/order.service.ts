import { AxiosError } from 'axios';
import http from '@/lib/axios';
import { buildQueryString } from '@/utils/commons.utils';
import { create } from 'zustand';
import handleAxiosError from '@/utils/handleError.utils';
import { CartItemType, CheckoutPayload, OrderType } from 'CustomTypes';

const API_URL = '/api/orders';

export const createOrder = async (orderData: CheckoutPayload) => {
  try {
    const res = await http.post(API_URL, orderData);
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error creating product');
    return null;
  }
}
export const fetchUserOrders = async (userId: string, status: string) => {
  try {
    const res = await http.get(`${API_URL}/userOrders`, {
      params: { userId, status }
    });
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching user orders');
    return null;
  }
};

export const checkIneficient = async (cartItems: CartItemType[]) => {
  try {
    console.log(cartItems, 'cartItems');
    const res = await http.post('/api/checkProductQuantities', cartItems);
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error checking inefficient');
    return null;
  }
}

export const fetchOrders = async () => {
  try {
    const res = await http.get(API_URL);
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching orders');
    return null;
  }
};

export const rejectOrder = async (orderId: number) => {
  try {
    const res = await http.put(`${API_URL}/reject/${orderId}`);
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error rejecting order');
    return null;
  }
}

export const updateOrderStatus = async (orderId: number, status: string, reason?: string): Promise<OrderType> => {
  try {
    const response = await http.put(`${API_URL}/${orderId}/status`, { status, reason });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};