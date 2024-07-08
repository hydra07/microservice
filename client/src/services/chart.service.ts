import http from '@/lib/axios';

export const getRecipeData = async () => {
    const response = await http.get('/api/dashboard/recipes');
    return response.data;
  };
  
  export const getOrderData = async () => {
    const response = await http.get('/api/dashboard/orders');
    return response.data;
  };
  
  export const getRevenueData = async () => {
    const response = await http.get('/api/dashboard/revenue');
    return response.data;
  };
  
  export const getTopProductData = async () => {
    const response = await http.get('/api/dashboard/top-products');
    return response.data;
  };

  export const getPostData = async () => {
    const response = await http.get('/api/dashboard/posts');
    return response.data;
  }

  export const getMetricData = async () => {
    const response = await http.get('/api/dashboard/metrics');
    return response.data;
  }



