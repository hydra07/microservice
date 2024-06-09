declare module "CustomTypes" {
  // CustomTypes.ts
export interface User {
  accessToken: string;
  refreshToken: string;
}

export type AuthState = {
  isLoggedIn: boolean;
  user: User;
  error: string;
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
  name?: string;
  isActive?: boolean;
};

export type ImgProductType = {
  id?: number;
  imageUrl: string;
  publicId: string;
  productId?: number;
};

export type MeasurementType = {
  id: number;
  unit: string;
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
  amountToSell?: number;
  averageWeight: number;
  measurement: MeasurementType;
  nutrition: NutritionType;
};

}
