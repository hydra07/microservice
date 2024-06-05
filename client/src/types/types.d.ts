declare module "CustomTypes" {
  export interface User {
    accessToken: string;
    refreshToken: string;
  }

  export type AuthState = {
    isLoggedIn: boolean;
    user: User;
    error: string;
    // isLoading: boolean;
  };

  export type UserInfo = {
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string;
    avatar: string;
    address: string;
  };

  export type ProductCategoryType = {
    id: string;
    name: string;
    isActive: boolean;
  };

  export type ImgProductType = {
    id: number;
    url: string;
    productId: number;
  };

  export type MeasurementType = {
    id: number;
    name: string;
    description: string;
  };

  export type NutritionType = {
    id?: number;
    calories?: number;
    sugar?: number;
    fat?: number;
    sodium?: number;
    carbs?: number;
    fiber?: number;
  };

  export type ProductType = {
    id: number;
    name: string;
    description: string;
    currentQuantity: number;
    price: number;
    imgProducts: ImgProductType[];
    category: ProductCategoryType;
    is_activated: boolean;
    amountToSell: number | null;
    averageWeight: number;
    measurementId: number;
    nutrition: NutritionType;
  };
}
