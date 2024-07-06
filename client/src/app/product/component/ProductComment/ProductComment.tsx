import React, { useState } from "react";
import { CommentList } from "./CommentList";
import { Pagination } from "./Pagination";
import { RatingSummary } from "./RatingSummary";
import { ImageOverlay } from "./ImageOverlay";
import { ReviewType } from "CustomTypes";

const imgNotFoundUrl = process.env.NEXT_PUBLIC_IMG_NOTFOUND as string;

export default function ProductComment() {
  const comments = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder-user.jpg",
      },
      rating: 4,
      createAt: "2023-05-12",
      comment: "I love this product! It has exceeded my expectations.",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    },
    {
      id: 2,
      user: {
        name: "Alex Smith",
        avatar: "/placeholder-user.jpg",
      },
      rating: 3,
      createAt: "2023-04-28",
      comment: "The product is good, but I had some issues with the delivery.",
      images: ["/placeholder.svg", "/placeholder.svg"],
    },
    {
      id: 3,
      user: {
        name: "Emily Parker",
        avatar: "/placeholder-user.jpg",
      },
      rating: 5,
      createAt: "2023-03-15",
      comment: "This is the best product I have ever purchased. Highly recommended!",
      images: ["/placeholder.svg"],
    },
    {
      id: 4,
      user: {
        name: "Michael Brown",
        avatar: "/placeholder-user.jpg",
      },
      rating: 4,
      createAt: "2023-02-22",
      comment: "The product is great, but the customer service could be better.",
      images: [],
    },
    {
      id: 5,
      user: {
        name: "Olivia Davis",
        avatar: "/placeholder-user.jpg",
      },
      rating: 5,
      createAt: "2023-01-10",
      comment: "I am very satisfied with this product. It has exceeded my expectations.",
      images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    },
  ]
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const commentsPerPage = 3;
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleImageClick = (imageSrc: string): void => {
    setSelectedImage(imageSrc);
  };

  const closeOverlay = (): void => {
    setSelectedImage(null);
  };

  const averageRating = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;

  return (
    <section className="p-4 md:p-6 mt-4">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold text-center">Customer Reviews</h2>
        
        <RatingSummary averageRating={averageRating} />

        <CommentList 
          comments={comments} 
          currentPage={currentPage} 
          commentsPerPage={commentsPerPage} 
          onImageClick={handleImageClick}
        />

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange}
        />
      </div>

      {selectedImage && (
        <ImageOverlay 
          imageSrc={selectedImage} 
          onClose={closeOverlay}
        />
      )}
    </section>
  );
}