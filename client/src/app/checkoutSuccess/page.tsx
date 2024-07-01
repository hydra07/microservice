import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { spaceMono } from "@/components/ui.custom/fonts";
export default function checkoutSuccess() {
    return (
        <div className={`${spaceMono.className} flex flex-col items-center justify-center gap-6 p-8 sm:p-12 md:p-16 bg-[#ece3d4]` }>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
            <CheckIcon className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Order Placed</h2>
            <p className="text-muted-foreground">
              Your order has been successfully placed. You can view the details below.
            </p>
          </div>
          <Link
            href="/orderPurchase"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={true}
          >
            View Order
          </Link>
        </div>
      )
}