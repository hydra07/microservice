"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useMemo, useCallback } from "react";
import * as OrderService from "@/services/order.service";
import { CartItem, CheckoutFormType, CheckoutPayload, ProductType } from "CustomTypes";
import { checkoutFormSchema } from "@/utils/validation.utils";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/store/useCartStore";
import CheckoutForm from "./component/CheckoutForm";
import CartSummaryTable from "./component/CartSummaryTable";
import OrderReview from "./component/OrderReview";

export default function Component() {
  console.log("Component re-render"); 

  const { data: session, status } = useSession();
  const cart = useFromStore(useCartStore, (state) => state.cart);

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
      name: session?.user?.username || "",
      phone: "",
      email: session?.user?.email || "",
      paymentMethod: "cod",
      address: "",
      district: "",
      ward: "",
    },
  });

  const getItemList = useCallback((cart: ProductType[]): CartItem[] => {
    return cart.map((item: ProductType) => ({
      productId: item.id,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));
  }, []);

  const onSubmit =(formData: CheckoutFormType) => {
    console.error("SUBMIT");
    const payload: CheckoutPayload = {
      id: session?.user?.id,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      paymentMethod: formData.paymentMethod,
      shipAddress: `${formData.address}, ${formData.ward}, ${formData.district}`,
      cart: getItemList(cart!),
    }

    OrderService.createOrder(payload).then((data) => {
      if (data) {
        console.log("Order created", data);
      }
    });
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
