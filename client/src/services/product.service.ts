import { ProductType } from 'CustomTypes';
// import http from "./http";
import http from '@/lib/axios';

export const fetchProducts = async () => {
  try {
    const res = await http.get('api/products');
    return res.data;
  } catch (error) {
    return [];
  }
};

export const createProduct = async (productData: ProductType) => {
  try {
    console.log(productData);
    // const res = await http.post("api/products", productData);
    // return res.data;
  } catch (error) {
    return null;
  }
};
