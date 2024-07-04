import { memo } from "react";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line react/display-name
const OrderReview = memo(({ totalPrice, onPlaceOrder }: { totalPrice: number, onPlaceOrder: () => void }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Order Review</h2>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3">
          <h3 className="font-medium">Order Summary</h3>
        </div>
        <div className="p-4 space-y-2">
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
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Button size="lg" onClick={onPlaceOrder}>
          Place Order
        </Button>
      </div>
    </section>
  );
});

export default OrderReview;
