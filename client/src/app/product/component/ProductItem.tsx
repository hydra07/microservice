import React from 'react';
import { ProductType } from 'CustomTypes';
import Link from 'next/link';
import Image from 'next/image';
import { useAddToCart } from '@/hooks/useAddToCart';

interface ProductItemProps {
  product: ProductType;
  imgNotFoundUrl: string;
}



const ProductItem: React.FC<ProductItemProps> = ({ product, imgNotFoundUrl }) => {
  const { handleAddToCart, isAdding } = useAddToCart(product);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(1); // Pass 1 as the default quantity
  };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <Image
            src={product.imgProducts?.[0]?.imageUrl ?? imgNotFoundUrl}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 mb-1">{product.name}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{`${product.amountToSell} ${product.measurement.unit}`} </p>
          {/* <TruncateText maxLength={20} text={product.description} className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2" /> */}
        </div>
      </Link>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleClick}
            disabled={isAdding}
            className={`flex-grow mr-2 text-sm font-semibold py-2 px-2 rounded-full transition-all duration-300
              ${isAdding
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                : 'bg-green-300 hover:bg-green-400 shadow-md hover:shadow-lg'}`}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
          <div className="text-sm font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap ml-5">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductItem);
