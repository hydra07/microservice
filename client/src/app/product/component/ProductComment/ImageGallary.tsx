import React from "react";
import Image from "next/image";

const imgNotFoundUrl = process.env.NEXT_PUBLIC_IMG_NOTFOUND as string;

interface ImageGalleryProps {
  images: string[];
  onImageClick: (imageSrc: string) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  if (images.length === 0) return null;

  return (
    <div className="mt-2 grid grid-cols-3 gap-1">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="cursor-pointer"
          onClick={() => onImageClick(imgNotFoundUrl)}
        >
          <Image
            src={imgNotFoundUrl}
            alt={`Feedback image ${index + 1}`}
            width={50}
            height={50}
            className="aspect-square w-full rounded-sm object-cover"
          />
        </div>
      ))}
    </div>
  );
};