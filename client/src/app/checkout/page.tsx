"use client";

import { useMemo, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/hooks/useAuth";
import * as OrderService from "@/services/order.service";
import {
  CartItemType,
  CheckoutFormType,
  CheckoutPayload,
  ProductType,
} from "CustomTypes";
import { checkoutFormSchema } from "@/utils/validation.utils";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/store/useCartStore";
import CheckoutForm from "./component/CheckoutForm";
import CartSummaryTable from "./component/CartSummaryTable";
import OrderReview from "./component/OrderReview";
import UserWrapper from "@/components/UserWrapper";
import { useRouter } from "next/navigation";
import * as CheckoutService from "@/services/checkout.service";

export default function Component() {
  const router = useRouter();
  const { user } = useAuth();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const { clearCart, setCheckoutPayload } = useCartStore();

  const totalPrice = useMemo(() => {
    return cart
      ? cart.reduce(
          (acc, product) => acc + product.price * (product.quantity as number),
          0
        )
      : 0;
  }, [cart]);

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: user?.username || "",
      phone: "",
      email: user?.email || "",
      paymentMethod: "cod",
      address: "",
      district: "",
      ward: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.username || "");
      form.setValue("email", user.email || "");
    }
  }, [user, form]);

  const getItemList = useCallback((cart: ProductType[]): CartItemType[] => {
    return cart.map((item: ProductType) => ({
      productId: item.id,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));
  }, []);

  const onSubmit = async (formData: CheckoutFormType) => {
    if (!cart || cart.length === 0) {
      console.error("Cannot submit order: No items in cart.");
      return;
    }
    

    const payload: CheckoutPayload = {
      userId: user?.id,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      paymentMethod: formData.paymentMethod,
      shipAddress: `${formData.address}, ${formData.ward}, ${formData.district}`,
      orderItems: getItemList(cart),
    };

    setCheckoutPayload(payload);

    try {
      if (formData.paymentMethod === "cod") {
        const order = await OrderService.createOrder(payload);
        if (order) {
          clearCart();
          router.push('/orderSuccess');
        }
      } else if (formData.paymentMethod === "vnpay") {
        const vnpayUrl = await CheckoutService.createVNPayUrl(totalPrice);
        if (vnpayUrl) {
          window.location.href = vnpayUrl;
        }
      } else {
        console.error("Unsupported payment method");
      }
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  return (
    <UserWrapper>
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container mx-auto grid md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
              <div className="border rounded-lg overflow-hidden">
                {cart && cart.length > 0 ? (
                  <CartSummaryTable cart={cart} />
                ) : (
                  <p className="p-4">Your cart is empty.</p>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice)}
                  </span>
                </div>
              </div>
            </section>
            <CheckoutForm form={form} onSubmit={onSubmit} />
          </div>
          <OrderReview
            totalPrice={totalPrice}
            onPlaceOrder={form.handleSubmit(onSubmit)}
          />
        </div>
      </main>
    </UserWrapper>
  );
}
