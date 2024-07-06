"use client";

import { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { StarIcon, XIcon, UploadIcon } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { createReview } from "@/services/review.service";

type ImageFile = File & { preview?: string };

export default function RatingDialog({
  orderItemId,
  productId,
  onRateSuccess,
}: {
  orderItemId: number;
  productId: number;
  onRateSuccess: () => void;
}) {
  const { user } = useAuth();
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value.slice(0, 200));
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map((file) => {
      const imageFile: ImageFile = file;
      imageFile.preview = URL.createObjectURL(file);
      return imageFile;
    });
    if (files.length + images.length <= 3) {
      setImages([...images, ...newFiles]);
    } else {
      alert("You can only upload up to 3 images.");
    }
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    // Submit review
    setIsSubmitting(true);
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("userId", user!.id);
    formData.append("productId", productId.toString());
    formData.append("orderItemId", orderItemId.toString());
    formData.append("rating", rating.toString());
    formData.append("comment", comment);

    const data = await createReview(formData);
    if (data) {
      setComment("");
      setRating(5);
      setImages([]);
      onRateSuccess();
    } else {
      alert("Error submitting review. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="bg-gray-500 hover:bg-gray-600 text-white"
        >
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Write a Review
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Textarea
              id="comment"
              placeholder="Share your thoughts..."
              value={comment}
              onChange={handleCommentChange}
              className="resize-none h-32"
              maxLength={200}
            />
            <p className="text-sm text-muted-foreground text-right">
              {200 - comment.length} characters remaining
            </p>
          </div>
          <div className="grid gap-2">
            <Label className="text-lg font-semibold">Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`text-2xl transition-colors ${
                    star <= rating
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  <StarIcon
                    className={`h-6 w-6 ${
                      star <= rating ? "fill-current" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-lg font-semibold">
              Upload Images (Max 3)
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg border border-gray-200"
                >
                  <Image
                    src={image.preview!}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-2 right-2 rounded-full bg-white/80 p-1 text-gray-600 transition-colors hover:bg-white hover:text-red-500"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {images.length < 3 && (
                <label
                  htmlFor="image-upload"
                  className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 transition-colors hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                >
                  <div className="text-center">
                    <UploadIcon className="h-8 w-8 mx-auto mb-2" />
                    <span className="text-sm">Upload Image</span>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
