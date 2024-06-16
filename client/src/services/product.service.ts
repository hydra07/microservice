import { AxiosError } from 'axios';
import http from '@/lib/axios';
import { PaginatedProducts, ProductType, QueryParams } from 'CustomTypes';
import { buildQueryString } from '@/utils/commons.utils';

const API_URL = '/api/products';

// export const fetchProducts = async (): Promise<ProductType[]> => {
//   try {
//     const res = await http.get<ProductType[]>(API_URL);
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return [];
//   }
// };

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export const fetchProducts = async (
//   page = 1,
//   limit = 10,
//   orderBy = 'createdAt',
//   order = 'DESC',
//   keyword = '',
//   category = ''
// ): Promise<PaginatedProducts[]> => {
//   const response = await http.get(`${API_URL}`, {
//     params: {
//       page,
//       limit,
//       orderBy,
//       order,
//       keyword,
//       category
//     }
//   });
//   return response.data;
// };


// export const fetchProducts = async (
//   page = 1,
//   limit = 10,
// ): Promise<PaginatedProducts> => {
//   try {
//     const res = await http.get(API_URL, { params: { page, limit } });
//     console.log('res', res); 
//     return res.data;
//   } catch (error) {
//     handleAxiosError(error, 'Error fetching products');
//     return { data: [], total: 0, limit: 0, page: 0 };
//   }
// };


export const fetchProducts = async (params: QueryParams) => {
  const queryString = buildQueryString(params);
  console.log('queryString', queryString);
  const response = await  http.get(`/api/shop/products?${queryString}`);
  const data = await response.data;
  console.log('data', data);
  return data;
};



// export const fetchProducts = async () => {
//   try {
//     const res = await http.get(API_URL);
//     return res.data;
//   } catch (error) {
//     handleAxiosError(error, 'Error fetching products');
//     return [];
//   }
// }


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
    // const res = await http.get<ProductType[]>(`${API_URL}/findByCategoryId`, {
    //   params: { fieldName: 'categoryId', keyword: categoryId },
    // });
    const res = await http.get<ProductType[]>(`${API_URL}/findByCategoryId/${categoryId}`);
    return res.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching products by category');
    return null;
  }
};

function handleAxiosError(error: unknown, message: string): void {
  if (error instanceof AxiosError) {
    console.error(`${message}:`, error.response?.data || error.message);
  } else {
    console.error(`${message}:`, error);
  }
}