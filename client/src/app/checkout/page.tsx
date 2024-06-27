"use client";
import { useMemo, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import * as OrderService from "@/services/order.service";
import { CartItemType, CheckoutFormType, CheckoutPayload, ProductType } from "CustomTypes";
import { checkoutFormSchema } from "@/utils/validation.utils";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/store/useCartStore";
import CheckoutForm from "./component/CheckoutForm";
import CartSummaryTable from "./component/CartSummaryTable";
import OrderReview from "./component/OrderReview";
import { getItemList } from "@/utils/commons.utils";


export default function Component() {
  console.log("Component re-render"); 

  const { user, status } = useAuth();

  const cart = useFromStore(useCartStore, (state) => state.cart);
  const checkout = useFromStore(useCartStore, (state) => state.checkout);

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

  // const getItemList = useCallback((cart: ProductType[]): CartItem[] => {
  //   return cart.map((item: ProductType) => ({
  //     productId: item.id,
  //     quantity: item.quantity,
  //     subtotal: item.price * item.quantity,
  //   }));
  // }, [cart]);

  const onSubmit =(formData: CheckoutFormType) => {
    const payload: CheckoutPayload = {
      id: user?.id,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      paymentMethod: formData.paymentMethod,
      shipAddress: `${formData.address}, ${formData.ward}, ${formData.district}`,
      orderItems: getItemList(cart!),
    }

    try {
      const order = OrderService.createOrder(payload);
    } catch (error) {
      console.error("checkout failed", error)
    }
    
  };

  return (
    <div className="">
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container mx-auto grid md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2> 
              <div className="border rounded-lg overflow-hidden">
                <CartSummaryTable cart={cart!} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    {
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice)
                    }
                  </span>
                </div>
              </div>
            </section>
            <CheckoutForm form={form} onSubmit={onSubmit} />
          </div>
          <OrderReview totalPrice={totalPrice} onPlaceOrder={form.handleSubmit(onSubmit)} />
        </div>
      </main>
    </div>
  );
}
