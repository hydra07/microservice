import React, { useEffect, useState } from "react";
import { CommentList } from "./CommentList";
import { Pagination } from "./Pagination";
import { RatingSummary } from "./RatingSummary";
import { ImageOverlay } from "./ImageOverlay";
import { ReviewType } from "CustomTypes";
import * as ReviewService from "@/services/review.service";

const imgNotFoundUrl = process.env.NEXT_PUBLIC_IMG_NOTFOUND as string;

export default function ProductComment() {
  const [comments, setComments] = useState<ReviewType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const commentsPerPage = 3;

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleImageClick = (imageSrc: string): void => {
    setSelectedImage(imageSrc);
  };

  const closeOverlay = (): void => {
    setSelectedImage(null);
  };

  const fetchComments = async (page: number) => {
    setIsLoading(true);
    try {
      const data = await ReviewService.getReview(7, page, commentsPerPage);
      if (data) {
        setComments(data.reviews);
        setTotalReviews(data.total);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const averageRating =
    comments.length > 0
      ? comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length
      : 0;

  const totalPages = Math.ceil(totalReviews / commentsPerPage);

  return (
    <section className="p-4 md:p-6 mt-4">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Customer Reviews
        </h2>

        {isLoading ? (
          <div className="text-center">Loading reviews...</div>
        ) : totalReviews > 0 ? (
          <>
            <RatingSummary averageRating={averageRating} />

            <CommentList
              comments={comments}
              onImageClick={handleImageClick}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">No reviews yet.</p>
            <p className="mt-2 text-sm text-gray-500">Be the first to review this product!</p>
          </div>
        )}
      </div>

      {selectedImage && (
        <ImageOverlay imageSrc={selectedImage} onClose={closeOverlay} />
      )}
    </section>
  );
}