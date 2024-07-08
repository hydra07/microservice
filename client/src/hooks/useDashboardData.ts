// Custom hook for fetching dashboard data
import * as chartService from '@/services/chart.service';
import { MetricData, OrderData, PostData, PostRecipeData, RecipeData, RevenueData, TopProductData } from 'chart';
import React from 'react';

const useDashboardData = () => {
    const [recipeData, setRecipeData] = React.useState<RecipeData[]>([]);
    const [postData, setPostData] = React.useState<PostData[]>([]);
    const [orderData, setOrderData] = React.useState<OrderData[]>([]);
    const [revenueData, setRevenueData] = React.useState<RevenueData[]>([]);
    const [topProductData, setTopProductData] = React.useState<TopProductData[]>([]);
    const [postRecipeData, setPostRecipeData] = React.useState<PostRecipeData[]>([]);
    const [metricData, setMetricData] = React.useState<MetricData>({} as MetricData);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const [recipeData, postData, orderData, revenueData, topProductData, metricData] = await Promise.all([
            chartService.getRecipeData(),
            chartService.getPostData(),
            chartService.getOrderData(),
            chartService.getRevenueData(),
            chartService.getTopProductData(),
            chartService.getMetricData(),
          ]);
  
          setRecipeData(recipeData);
          setPostData(postData);
          setOrderData(orderData);
          setRevenueData(revenueData);
          setTopProductData(topProductData);
          setMetricData(metricData);
  
          const combinedData: PostRecipeData[] = recipeData.map((recipe: RecipeData) => ({
            ...recipe,
            posts: postData.find((post: PostData) => post.month === recipe.month)?.posts || 0,
          }));
  
          setPostRecipeData(combinedData);
        } catch (error) {
          setError(error instanceof Error ? error : new Error('An unknown error occurred'));
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { recipeData, postData, orderData, revenueData, topProductData, postRecipeData, metricData, isLoading, error };
  };
  
  export default useDashboardData;