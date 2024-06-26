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

