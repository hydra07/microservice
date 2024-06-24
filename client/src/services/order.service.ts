import { AxiosError } from 'axios';
import http from '@/lib/axios';
import { buildQueryString } from '@/utils/commons.utils';
import { create } from 'zustand';
import handleAxiosError from '@/utils/handleError.utils';
import { CheckoutPayload } from 'CustomTypes';

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