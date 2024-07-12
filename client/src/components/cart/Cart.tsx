import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ShoppingBasket, ShoppingCartIcon } from "lucide-react";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/store/useCartStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { checkIneficient } from "@/services/order.service";
import useCartCalculations from "@/hooks/useCartCalculations";
import CartItemList from "./CartItemList";
import EmptyCart from "./EmptyCart";
import InsufficientStockWarning from "./InsufficientStockWarning";
import CheckoutButton from "./CheckoutButton";

export default function Cart() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const [insufficientList, setInsufficientList] = useState<string[]>([]);
  const { total, cartItems } = useCartCalculations(cart!);

  useEffect(() => {
    const fetchInefficientItems = async () => {
      if (cart && cart.length > 0) {
        const result = await checkIneficient(cartItems);
        if (result) {
          setInsufficientList(result);
        }
      }
    };

    fetchInefficientItems();
  }, [cart, cartItems]);

  return (
    <Drawer direction="bottom" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-full bg-green-400 hover:bg-green-400  shadow-lg transition-transform hover:scale-105 active:scale-95 dark:bg-gray-900 dark:text-gray-50"
        >
          <ShoppingBasket className="h-5 w-5 text-primary-600" />
          <span className="font-semibold text-primary-600">
             ({cart?.length || 0})
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
          {cart && cart.length > 0 ? (
            <CartItemList cart={cart} insufficientList={insufficientList} />
          ) : (
            <EmptyCart setIsOpen={setIsOpen} />
          )}
        </ScrollArea>
        {cart && cart.length > 0 && (
          <DrawerFooter className="border-t px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <p className="font-medium text-gray-800">Total</p>
              <p className="font-semibold text-xl text-primary-600">
                {
                  new Intl.NumberFormat('vi', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(total)
                }
              </p>
            </div>
            <InsufficientStockWarning insufficientList={insufficientList} />
            <CheckoutButton 
              insufficientList={insufficientList} 
              onCheckout={() => router.push('http://localhost:4000/checkout')}
            />
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
