import { useState } from "react";
import Image from "next/legacy/image";
import { ProductType } from "CustomTypes";

const imgNotFound = process.env.NEXT_PUBLIC_IMG_NOTFOUND as string;

export default function ProductImage({ product }: { product: ProductType }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={product.imgProducts[selectedImage]?.imageUrl || imgNotFound}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-[400px] md:h-[600px] object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {product.imgProducts.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`shrink-0 w-[80px] h-[80px] rounded-md overflow-hidden border-2 transition-all ${
              index === selectedImage
                ? "border-primary"
                : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            aria-label={`Select image ${index + 1}`}
          >
            <Image
              src={image.imageUrl || imgNotFound}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}