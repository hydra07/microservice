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
    <div className="mt-2 flex flex-wrap gap-2">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="cursor-pointer w-20 h-20 relative"
          onClick={() => onImageClick(image)}
        >
          <Image
            src={image || imgNotFoundUrl}
            alt={`Feedback image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-sm"
          />
        </div>
      ))}
    </div>
  );
};