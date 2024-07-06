import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageOverlayProps {
  imageSrc: string;
  onClose: () => void;
}

export const ImageOverlay: React.FC<ImageOverlayProps> = ({ imageSrc, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        <Image
          src={imageSrc}
          alt="Selected feedback image"
          width={500}
          height={500}
          className="max-w-full max-h-[80vh] object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};