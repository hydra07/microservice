import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { ProductType } from "CustomTypes";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Alert } from "../ui.custom/user/Alert";
import Image from "next/image";
import * as ProductService from '@/services/product.service';
interface Props {
  item: ProductType;
}

export default function CartItem({ item }: Props) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const imgNotFoundUrl = process.env.NEXT_PUBLIC_IMG_NOTFOUND;
  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleRemove = () => {
    setIsAlertOpen(true);
  };

  const handleConfirm = () => {
    removeFromCart(item);
    setIsAlertOpen(false);
  };

  const handleCancel = () => {
    setIsAlertOpen(false);
  };

  const handleUpdateQuantity = async (change: number) => {
    if(change === -1){
      updateCartItem(item, change);
      return;
    }

    const product = await ProductService.getProductById(item.id);
    const newQuantity = item.quantity + change;
    
    if (newQuantity > product?.currentQuantity!) {
      setErrorMessage("Quantity exceeds available stock!");
      setTimeout(() => setErrorMessage(null), 3000); // Clear error after 3 seconds
    } else {
      setErrorMessage(null);
      updateCartItem(item, change);
    }
    
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
      <Image
        alt={item.name}
        src={item.imgProducts?.[0]?.imageUrl ?? imgNotFoundUrl}
        width={64}
        height={64}
        className="rounded-md object-cover"
      />
      <div className="grid gap-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {
            new Intl.NumberFormat("vi", {
              style: "currency",
              currency: "VND",
            }).format(item.price)
          }
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <Button
            className="text-red-500 dark:text-red-400"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
          <Alert
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your item from the cart."
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            open={isAlertOpen}
            setOpen={setIsAlertOpen}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => 
              item.quantity === 1 ? handleRemove() : handleUpdateQuantity(-1)
            }
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="font-medium w-3">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleUpdateQuantity(1)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-[1px] text-xs text-red-500">
          {errorMessage && (
            <p>{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}