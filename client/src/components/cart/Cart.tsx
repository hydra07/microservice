import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, ShoppingBagIcon, TruckIcon } from "lucide-react";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/store/useCartStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Cart() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cart = useFromStore(useCartStore, (state) => state.cart);

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.price * (product.quantity as number),
      0
    );
  }

  return (
    <Drawer direction="bottom" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-full bg-white shadow-lg transition-transform hover:scale-105 active:scale-95 dark:bg-gray-900 dark:text-gray-50"
        >
          <ShoppingCartIcon className="h-5 w-5 text-primary-600" />
          <span className="font-semibold text-primary-600">
            Cart ({cart?.length || 0})
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full inset-x-21 mx-4 max-w-md right-0 bg-white rounded-t-2xl shadow-xl dark:bg-gray-900">
        <DrawerHeader className="px-6 py-4 border-b">
          <DrawerTitle className="text-xl font-semibold text-gray-800 dark:text-white">
            Your Cart
          </DrawerTitle>
          <DrawerDescription className="text-gray-500">
            Review and checkout the items in your cart.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="flex-1 overflow-auto py-4 max-h-[250px]">
          {cart?.length! > 0 ? (
            <ul className="grid gap-4 px-6">
              {cart?.map((product) => (
                <CartItem key={product.id} item={product} />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <ShoppingBagIcon className="h-16 w-16 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-800 mt-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mt-2">
                Looks like you have not added anything to your cart yet.
              </p>
              <Button
                variant="outline"
                className="mt-6 px-6 py-3 rounded-full transition-colors  hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                Start Shopping
              </Button>
            </div>
          )}
        </ScrollArea>
        {cart?.length! > 0 && (
          <DrawerFooter className="border-t px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <p className="font-medium text-gray-800">Total</p>
              <p className="font-semibold text-xl text-primary-600">
                ${total.toFixed(2)}
              </p>
            </div>
            <Button className="w-full py-3 rounded-full bg-green-400 text-white transition-transform hover:bg-green-600 hover:scale-105 active:scale-95">
              <TruckIcon className="h-5 w-5" />
              Checkout
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
