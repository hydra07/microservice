import { create } from "zustand";
import { ProductType } from "CustomTypes";

interface State {
  cart: ProductType[];
  totalItems: number;
  totalPrice: number;
}

interface Actions {
  addToCart: (Item: ProductType) => void;
  removeFromCart: (Item: ProductType) => void;
}

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create<State & Actions>((set, get) => ({
  ...INITIAL_STATE,
  addToCart: (product: ProductType) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      // Corrected the map operation
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity as number) + 1 } : item
    );
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    }
  },
  removeFromCart: (product: ProductType) => {
    removeFromCart: (product: ProductType) => {
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== product.id),
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - product.price,
      }));
    };
  },
}));
