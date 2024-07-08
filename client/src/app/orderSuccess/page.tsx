"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Ensure you have the correct import for the router
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { spaceMono } from "@/components/ui.custom/fonts";
import { useCartStore } from "@/store/useCartStore";

export default function OrderSuccessPage() {
  console.log("rendering order success page");
  const checkoutPayload = useCartStore((state) => state.checkoutPayload);
  const router = useRouter();
  const { clearCheckoutPayload } = useCartStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!checkoutPayload) {
      router.push("/");
    }
    return () => {
      clearCheckoutPayload();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (checkoutPayload) {
      setIsInitialized(true);
    }
  }, [checkoutPayload]); 

  if (!isInitialized) {
    return null;
  }

  return (
    <div
      className={`${spaceMono.className} flex flex-col items-center justify-center gap-6 p-8 sm:p-12 md:p-16 bg-[#ece3d4]`}
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full bg-green-500`}
      >
        <CheckIcon className="h-8 w-8 text-white" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Order Placed Successfully</h2>
        <p className="text-muted-foreground">
          Thank you for your order. Your order has been successfully placed.
        </p>
        {/* {checkoutPayload && (
          <p className="text-sm text-gray-600">
            Order details have been sent to: {checkoutPayload.email}
          </p>
        )} */}
      </div>
      <Link
        href="/orderPurchase"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        View Order
      </Link>
    </div>
  );
}
