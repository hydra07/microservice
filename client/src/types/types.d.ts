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
    id: number;
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
    calories: number;
    sugar: number;
    fat: number;
    sodium: number;
    carbs: number;
    fiber: number;
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
    amountToSell: number;
    averageWeight: number;
    measurement: MeasurementType;
    nutrition: NutritionType;
    quantity: number;
  };

  export type CheckoutFormType = {
    name: string;
    phone: string;
    email: string;
    paymentMethod: string;
    ward: string; // Add this line if 'ward' is a field in your form
    province: string; // Add this line if 'province' is a field in your form
    district: string; // Add this line if 'district' is a field in your form
    address: string;
  };

  export interface PaginatedProducts {
    total;
    limit;
    page;
    data: ProductType[];
  }

  export interface QueryParams {
    page?: number;
    limit?: number;
    keyword?: string;
    fieldName?: string;
    category?: string;
    order?: string;
    orderBy?: string;
  }

  export interface CartItemType {
    productId: number;
    quantity: number;
    subtotal: number;
  }

  export interface CheckoutPayload {
    id?: string; //user
    name?: string;
    phone?: string;
    email?: string;
    paymentMethod?: string;
    shipAddress?: string;
    orderItems?: CartItem[];
    totalPrice?: number;
  }

  
  export interface OrderType {
    id: string;
    userId?: string;
    createAt: string;
    shipDate?: string;
    total: number;
    status: string;
    items: OrderItemType[]; 
    name?: string;
    phone?: string;
    email?: string;
    paymentMethod?: string;
    shipAddress?: string;
  } 

  export interface OrderItemType {
    productId?: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }
}
