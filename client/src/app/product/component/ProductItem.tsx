import React, { useCallback, useRef, useState } from 'react';
import { ProductType } from 'CustomTypes';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import useFromStore from '@/hooks/useFromStore';
import { toast, Id } from 'react-toastify';

interface ProductItemProps {
  product: ProductType;
  imgNotFoundUrl: string;
}



const ProductItem: React.FC<ProductItemProps> = ({ product, imgNotFoundUrl }) => {
  const addToCart = useCartStore(state => state.addToCart);
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const [isAdding, setIsAdding] = useState(false);
  const toastId = useRef<Id | null>(null);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding) return;
    
    setIsAdding(true);
    
    const cartItem = cart?.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity + 1 > product.currentQuantity) {
       
      if (!toast.isActive(toastId.current as any)) {
        toastId.current = toast.error("Quantity exceeds available stock!");
      }
    } else {
      addToCart(product);
      if (!toast.isActive(toastId.current as any)) {
        toastId.current = toast.success("Product added to cart!");
      }
    }
    
    setTimeout(() => setIsAdding(false), 500);
  }, [addToCart, cart, isAdding, product]);

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
      <Link href={`/product/${product.id}`} className="block">
        <Image
          src={product.imgProducts?.[0]?.imageUrl ?? imgNotFoundUrl}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-4 font-medium text-primary-500">
            ${product.price.toFixed(2)}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`mt-4 w-full font-semibold py-2 px-4 rounded-md transition-colors duration-300
              ${isAdding 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-green-300 hover:bg-green-500 text-white'}`}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(ProductItem);