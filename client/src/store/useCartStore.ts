import { create } from "zustand";
import { CheckoutFormType, CheckoutPayload, ProductType } from "CustomTypes";
import { persist } from "zustand/middleware";
import * as OrderService from "@/services/order.service";

interface State {
  cart: ProductType[];
  totalItems: number;
  totalPrice: number;
  checkoutPayload: CheckoutPayload | null;
}

interface MigratedState extends State {
  totalProducts: number; // Optional because it's from the old state structure
}

interface Actions {
  addToCart: (product: ProductType, quantity: number) => void;
  removeFromCart: (product: ProductType) => void;
  updateCartItem: (product: ProductType, quantity: number) => void;
  clearCart: () => void;
  setCheckoutPayload: (payload: CheckoutPayload) => void;
  getCheckoutPayload: () => CheckoutPayload | null;
  clearCheckoutPayload: () => void;
}

type PersistedState = State & Partial<{ totalProducts: number }>; // Partial type is used to make the field optional

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  checkoutPayload: null,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...INITIAL_STATE,
      addToCart: (product: ProductType, quantity: number = 1) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + quantity }
              : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + quantity,
            totalPrice: state.totalPrice + product.price * quantity,
          }));
        } else {
          const updatedCart = [...cart, { ...product, quantity }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + quantity,
            totalPrice: state.totalPrice + product.price * quantity,
          }));
        }
      },
      removeFromCart: (product: ProductType) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.filter((item) => item.id !== product.id);
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - cartItem.quantity,
            totalPrice: state.totalPrice - product.price * cartItem.quantity,
          }));
        }
      },
      updateCartItem: (product: ProductType, quantityChange: number) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);
        if (cartItem) {
          const newQuantity = Math.max(1, cartItem.quantity + quantityChange);
          const updatedCart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: newQuantity } : item
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + quantityChange,
            totalPrice: state.totalPrice + product.price * quantityChange,
          }));
        }
      },
      clearCart: () => {
        set((state) => ({
          cart: [],
          totalItems: 0,
          totalPrice: 0,
        }));
      },
      setCheckoutPayload: (payload: CheckoutPayload) => {
        set({ checkoutPayload: payload });
      },
      getCheckoutPayload: () => {
        return get().checkoutPayload;
      },
      clearCheckoutPayload: () => {
        set({ checkoutPayload: null });
      },
    }),
    {
      name: "cart-storage",
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as PersistedState;
        if (version === 0 && state.totalProducts !== undefined) {
          state.totalItems = state.totalProducts;
          delete state.totalProducts;
        }
        return state as State & Actions;
      },
    }
  )
);
