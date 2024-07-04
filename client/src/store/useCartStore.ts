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
  addToCart: (Item: ProductType) => void;
  removeFromCart: (Item: ProductType) => void;
  updateCartItem: (Item: ProductType, quantity: number) => void;
  clearCart: () => void;
  setCheckoutPayload: (payload: CheckoutPayload) => void;
  getCheckoutPayload: () => CheckoutPayload | null;
  clearCheckoutPayload: () => void
}

type PersistedState = State & Partial<{ totalProducts: number }>; // Partial type is used to make the field optional

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  checkoutPayload: null,
};

//* In Zustand, persist middleware can be used to persist the state in the browser’s local storage, allowing the state to be maintained even after the page is reloaded or the browser is closed.

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      checkoutPayload: INITIAL_STATE.checkoutPayload,
      addToCart: (product: ProductType) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (cartItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item
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
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.price,
        }));
      },
      //increase or decrease the quantity of a product in the cart
      updateCartItem: (product: ProductType, quantity: number) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);
        const updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity as number) + quantity }
            : item
        );
        set((state) => ({
          cart: updatedCart,
          totalPrice: state.totalPrice + product.price * quantity,
        }));
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
      // getStorage: () => sessionStorage, (optional) by default the 'localStorage' is used
      version: 1, // State version number,
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

//do luong product o trong local store khong kiem tra duoc so voi db
//handle checkout neu so luong trong kho khong du
//handle add to cart neu so luong trong kho khong du
