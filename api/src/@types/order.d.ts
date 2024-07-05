export interface CheckoutFormData{
    id: string;
    name: string;
    phone: string;
    email: string;
    paymentMethod: string;
    shipAddress: string;
    cart: CartItem[];
}

export interface CartItem{
    product: Product;
    quantity: number;
    subtotal: number;
}


export interface OrderType {
    id: string;
    userId: string;
    createAt: string;
    shipDate?: string;
    total: number;
    status: string;
    orderItems: OrderItemType[];
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