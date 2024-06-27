import { AxiosError } from 'axios';
import http from '@/lib/axios';
import { buildQueryString } from '@/utils/commons.utils';
import { create } from 'zustand';
import handleAxiosError from '@/utils/handleError.utils';
import { CartItemType, CheckoutPayload } from 'CustomTypes';

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