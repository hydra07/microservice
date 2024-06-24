// import { Button } from "@/components/ui/button";
// import { useCartStore } from "@/store/useCartStore";
// import { ProductType } from "CustomTypes";
// import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
// import { useRef, useState } from "react";
// import { Alert } from "../ui.custom/user/Alert";
// import Image from "next/image";
// import { ToastContainer, toast, Id } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 
// import { useToast } from "@/hooks/useToast";

// interface Props {
//   item: ProductType;
// }

// const STOCK_EXCEEDED_ERROR = "Quantity exceeds available stock!";

// const toastConfig = {
//   position: "top-right" as const,
//   autoClose: 1000,
//   hideProgressBar: false,
//   newestOnTop: false,
//   closeOnClick: true,
//   rtl: false,
//   pauseOnFocusLoss: true,
//   draggable: true,
//   pauseOnHover: true,
//   theme: "light" as const,
// };

// export default function CartItem({ item }: Props) {
//   const { updateCartItem, removeFromCart } = useCartStore();
//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const toastId = useRef<Id | null>(null);
//   const {showToast} = useToast();
//   const [notification, setNotification] = useState<string | null>(null);
//   const getImageUrl = (item: ProductType): string => {
//     return item.imgProducts?.[0]?.imageUrl ?? process.env.NEXT_PUBLIC_IMG_NOTFOUND ?? '';
//   };

//   const handleRemove = () => setIsAlertOpen(true);

//   const handleConfirm = () => {
//     removeFromCart(item);
//     setIsAlertOpen(false);
//   };

//   const handleCancel = () => setIsAlertOpen(false);

//   const handleUpdateQuantity = (change: number) => {
//     if(change < 0){
//        updateCartItem(item, change);
//     }
//     const newQuantity = item.quantity + change;
//     if (newQuantity > item.currentQuantity) {
//       if (!toast.isActive(toastId.current as any)) {
//         showToast(STOCK_EXCEEDED_ERROR, 'error');
//       }
//       return;
//     }
//     updateCartItem(item, change);
//   };

//   return (
//     <li className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
//       <Image
//         alt={item.name}
//         src={getImageUrl(item)}
//         width={64}
//         height={64}
//         className="rounded-md object-cover"
//       />
//       <div className="grid gap-1">
//         <h4 className="font-medium">{item.name}</h4>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           ${item.price.toFixed(2)}
//         </p>
//       </div>
//       <div className="flex items-center gap-2">
//         <Button
//           className="text-red-500 dark:text-red-400"
//           variant="ghost"
//           size="icon"
//           onClick={handleRemove}
//           aria-label="Remove item"
//         >
//           <TrashIcon className="h-4 w-4" />
//         </Button>
//         <Alert
//           title="Are you absolutely sure?"
//           description="This action cannot be undone. This will permanently delete your item from the cart."
//           onConfirm={handleConfirm}
//           onCancel={handleCancel}
//           open={isAlertOpen}
//           setOpen={setIsAlertOpen}
//         />
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => item.quantity === 1 ? handleRemove() : handleUpdateQuantity(-1)}
//           aria-label="Decrease quantity"
//         >
//           <MinusIcon className="h-4 w-4" />
//         </Button>
//         <span className="font-medium w-3">{item.quantity}</span>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => handleUpdateQuantity(1)}
//           aria-label="Increase quantity"
//         >
//           <PlusIcon className="h-4 w-4" />
//         </Button>
//       </div>
//       <ToastContainer {...toastConfig} />
//     </li>
//   );
// }
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

  const handleUpdateQuantity = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > item.currentQuantity) {
      setErrorMessage("Quantity exceeds available stock!");
      setTimeout(() => setErrorMessage(null), 3000); // Clear error after 3 seconds
    } else {
      setErrorMessage(null);
      updateCartItem(item, change);
    }
  };

  return (
    <li className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
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
          ${item.price.toFixed(2)}
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
        {errorMessage && (
          <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    </li>
  );
}