import React, { useMemo, useState } from "react";
import Image from "next/image";
import { OrderItemType } from "CustomTypes";
import { Button } from "@/components/ui/button";
import RatingDialog from "./RatingDialog";

const IMAGE_NOT_FOUND = process.env.NEXT_PUBLIC_IMG_NOTFOUND as string;

const OrderItems: React.FC<{ items: OrderItemType[]; status: string; }> = ({
  items,
  status,
}) => {

  const [showRate, setShowRate] = useState(true);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi", {
      style: "currency",
      currency: "VND",
    }).format(price);


  const formattedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        formattedPrice: formatPrice(item.price * item.quantity),
        formattedUnitPrice: formatPrice(item.price),
      })),
    [items]
  );

  const onRateSuccess = () => {
    setShowRate(false);
  }

  return (
    <div className="space-y-3">
      {formattedItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <Image
            src={item.image || IMAGE_NOT_FOUND}
            alt={item.name}
            width={48}
            height={48}
            className="rounded-md object-cover"
          />
          <div className="flex-grow min-w-0">
            <p className="font-medium text-sm truncate">{item.name}</p>
            <p className="text-xs text-gray-500">
              {item.quantity} x {item.formattedUnitPrice}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm whitespace-nowrap">
              {item.formattedPrice}
            </p>
            {status === "completed" && !item.isRated && showRate && (
              <RatingDialog onRateSuccess={onRateSuccess} orderItemId={item.id}  productId={item.productId}/>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItems;
