import { AxiosError } from 'axios';
import http from '@/lib/axios';
import { buildQueryString } from '@/utils/commons.utils';


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