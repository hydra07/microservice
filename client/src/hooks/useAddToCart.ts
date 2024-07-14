import { useCallback, useState, useRef } from "react";
import { toast, Id } from "react-toastify";
import { ProductType } from "CustomTypes";
import { useCartStore } from "@/store/useCartStore";

export const useAddToCart = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const [isAdding, setIsAdding] = useState(false);
  const toastId = useRef<Id | null>(null);

  const handleAddToCart = useCallback(
    (quantity: number = 1, product: ProductType) => {
      if (isAdding) return;

      setIsAdding(true);

      const cartItem = cart?.find((item) => item.id === product.id);
      if (cartItem && cartItem.quantity + quantity > product.currentQuantity) {
        if (!toast.isActive(toastId.current as any)) {
          toastId.current = toast.error("Quantity exceeds available stock!");
        }
      } else {
        addToCart(product, quantity);
        if (!toast.isActive(toastId.current as any)) {
          toastId.current = toast.success("Product added to cart!");
        }
      }

      setTimeout(() => setIsAdding(false), 500);
    },
    [addToCart, cart, isAdding]
  );

  return { handleAddToCart, isAdding };
};
