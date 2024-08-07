import React, { useEffect, useState, useCallback } from "react";
import { CommentList } from "./CommentList";
import { Pagination } from "./Pagination";
import { RatingSummary } from "./RatingSummary";
import { ImageOverlay } from "./ImageOverlay";
import { ReviewType } from "CustomTypes";
import * as ReviewService from "@/services/review.service";
import {
  dancingScript,
  playfairDisplay,
  lusitana,
} from "@/components/ui.custom/fonts";

const imgNotFoundUrl = process.env.NEXT_PUBLIC_IMG_NOTFOUND as string;

export default function ProductComment({ productId }: { productId: number }) {
  const [comments, setComments] = useState<ReviewType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const commentsPerPage = 3;

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  const handlePageChange = useCallback((page: number): void => {
    setCurrentPage(page);
  }, []);

  const handleImageClick = useCallback((imageSrc: string): void => {
    setSelectedImage(imageSrc);
  }, []);

  const closeOverlay = useCallback((): void => {
    setSelectedImage(null);
  }, []);

  const handleDeleteComment = useCallback(async (commentId: number) => {
    setIsDeleting(true);
    try {
      await ReviewService.deleteReview(commentId);
      fetchComments(currentPage); // Refresh comments after deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }, [currentPage]);

  const fetchComments = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const data = await ReviewService.getReview(productId, page, commentsPerPage);
      if (data) {
        setComments(data.reviews);
        setTotalReviews(data.total);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert("Failed to load comments. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [productId, commentsPerPage]);

  const averageRating =
    comments.length > 0
      ? comments.reduce((acc, comment) => acc + comment.rating, 0) /
        comments.length
      : 0;

  const totalPages = Math.ceil(totalReviews / commentsPerPage);

  return (
    <section className="p-4 md:p-6 mt-4">
      <div className="mx-auto max-w-2xl">
        <h2 className={`${lusitana.className} mb-8 text-3xl font-extrabold text-gray-900 text-center`}>
          Customer Reviews
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : totalReviews > 0 ? (
          <>
            <RatingSummary averageRating={averageRating} />
            <CommentList
              comments={comments}
              onImageClick={handleImageClick}
              onDeleteComment={handleDeleteComment}
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

      {selectedImage && <ImageOverlay imageSrc={selectedImage} onClose={closeOverlay} />}
    </section>
  );
}