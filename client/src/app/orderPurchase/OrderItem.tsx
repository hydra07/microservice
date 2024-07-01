import React, { useEffect, useState } from "react";
import Image from "next/image";
import { OrderItemType } from "CustomTypes";

const IMAGE_NOT_FOUND = process.env.NEXT_PUBLIC_IMG_NOTFOUND as string;

const OrderItems: React.FC<{ items: OrderItemType[] }> = ({ items }) => {
  const [formattedPrices, setFormattedPrices] = useState<string[]>([]);

  useEffect(() => {
    const prices = items.map((item) =>
      new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND",
      }).format(item.price * item.quantity)
    );
    setFormattedPrices(prices);
  }, [items]);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Image
            src={IMAGE_NOT_FOUND}
            alt={item.name}
            width={64}
            height={64}
            className="rounded-md object-cover"
          />
          <div className="flex-grow">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
          </div>
          <p className="font-medium">{formattedPrices[index]}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderItems;
