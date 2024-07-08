declare module "chart" {
  export interface OrderData {
    month: string;
    orders: number;
  }

  export interface RevenueData {
    month: string;
    revenue: number;
  }

  export interface ProductData {
    name: string;
    sales: number;
  }

  export interface RecipeData {
    month: string;
    recipes: number;
  }

  export interface PostData {
    month: string;
    posts: number;
  }

  export interface PostRecipeData {
    month: string;
    posts: number;
    recipes: number;
  }

  export interface OrderData {
    month: string;
    orders: number;
  }

  export interface TopProductData {
    name: string;
    sales: number;
  }

  export interface MetricData {
    recipesToCheck: number;
    postsToCheck: number;
    pendingOrders: number;
    userCount: number;
    income: {
        lastWeekCount: number;
        weekBeforeLastCount: number;
    };
  }
}
