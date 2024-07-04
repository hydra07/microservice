import { AxiosError } from 'axios';
import http from '@/lib/axios';
import { buildQueryString } from '@/utils/commons.utils';
import { CheckoutPayload, OrderType } from 'CustomTypes';


const API_URL = '/api/checkout';

export const createOrder = async (orderData: any) => {
  try {
    const res = await http.post(`${API_URL}/create-order`, orderData);
    return res.data;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

export const createVNPayUrl = async (totalPrice: number) => {
  try {
    const res = await http.post('/api/create_payment_url', {
      amount: totalPrice,
    });
    return res.data.vnpayUrl;
  } catch (error) {
    console.error('Error creating VNPay URL:', error);
    return null;
  }
}

export const refund = async (orderId: number, createBy: string) => {
  try {
    const res = await http.post(`${API_URL}/refund`, { orderId, createBy });
    return res.data;
  } catch (error) {
    console.error('Error refunding order:', error);
    return null;
  }
}