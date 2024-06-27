import { memo } from "react";
import Image from "next/image";
import { ProductType } from "CustomTypes";

// eslint-disable-next-line react/display-name
const CartSummaryTable = memo(({ cart }: { cart: ProductType[] }) => {
  return (
    <table className="w-full">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-3 text-left">Item</th>
          <th className="px-4 py-3 text-right">Quantity</th>
          <th className="px-4 py-3 text-right">Price</th>
        </tr>
      </thead>
      <tbody>
        {cart?.map((product) => (
          <tr key={product.id}>
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Image
                  src={product.imgProducts?.[0]?.imageUrl}
                  width={64}
                  height={64}
                  alt="Product Image"
                  className="rounded-md"
                />
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {product.quantity} x {product.price}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-right">
              <div className="flex items-center justify-end gap-2">
                <span>{product.quantity}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-right">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price * product.quantity)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default CartSummaryTable;
