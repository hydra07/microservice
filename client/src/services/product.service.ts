import { AxiosError } from 'axios';
import http from '@/lib/axios';
import { PaginatedProducts, ProductType, QueryParams } from 'CustomTypes';
import { buildQueryString } from '@/utils/commons.utils';
import handleAxiosError from '@/utils/handleError.utils';

const API_URL = '/api/products';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProducts = async (params: QueryParams) => {
  const queryString = buildQueryString(params);
  console.log('queryString', queryString);
  const response = await  http.get(`/api/shop/products?${queryString}`);
  const data = await response.data;
  return data;
};

export const getAllProducts = async (): Promise<ProductType[] | null> => {
  try {
    const res = await http.get<ProductType[]>(API_URL);
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching products');
    return null;
  }
}


export const createProduct = async (productData: Omit<ProductType, 'id'>): Promise<ProductType | null> => {
  try {
    const res = await http.post<ProductType>(API_URL, productData);
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error creating product');
    return null;
  }
};

export const updateProduct = async (productData: ProductType): Promise<ProductType | null> => {
  try {
    const res = await http.put<ProductType>(`${API_URL}/${productData.id}`, productData);
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error updating product');
    return null;
  }
};

export const getProductById = async (id: number): Promise<ProductType | null> => {
  try {
    const res = await http.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching product by ID');
    return null;
  }
};

export const getProductByCategory = async (categoryId: number): Promise<ProductType[] | null> => {
  try {
    const res = await http.get<ProductType[]>(`${API_URL}/findByCategoryId/${categoryId}`);
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching products by category');
    return null;
  }
};
