import React, { ChangeEvent, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";

interface StepType {
  description: string;
  images: File[];
}

interface StepProps {
  step: { description: string; images: File[] };
  index: number;
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    name: keyof StepType,
    value: string | File[]
  ) => void;
}

const Step: React.FC<StepProps> = ({ step, index, onRemove, onChange }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const previews = step.images.map((image) => URL.createObjectURL(image));
    setImagePreviews(previews);

    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [step.images]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newImages = Array.from(e.target.files || []);
    if (step.images.length + newImages.length <= 3) {
      onChange(index, "images", [...step.images, ...newImages]);
    } else {
      alert("You can only upload up to 3 images.");
    }
  };

  const handleImageRemove = (i: number) => {
    const newImages = step.images.filter((_, imgIndex) => imgIndex !== i);
    onChange(index, "images", newImages);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Step {index + 1}</h3>
        <Button onClick={() => onRemove(index)} variant="ghost" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        placeholder="Describe this step"
        value={step.description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(index, "description", e.target.value)
        }
        className="border-amber-300 focus:border-amber-500"
      />
      <Input
        type="file"
        multiple
        onChange={handleImageChange}
        className="border-amber-300 focus:border-amber-500"
      />
      {imagePreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {imagePreviews.map((src, i) => (
            <div key={i} className="relative">
              <Image
                src={src}
                alt={`Step ${index + 1} - Image ${i + 1}`}
                className="w-full h-auto rounded"
                width={100}
                height={100}
              />
              <button
                onClick={() => handleImageRemove(i)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Step;
