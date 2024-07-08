import { PostgresDataSource } from "@/config/db.config";
import { Review } from "@/entity/review.entity";
import { ImgReview } from "@/entity/imgReview.entity";
import { CreateReviewDto } from "@/dto/create-review.dto";
import { OrderItem } from "@/entity/orderItem.entity";

export default class ReviewService {
  async saveReview(reviewData: CreateReviewDto): Promise<Review> {
    const reviewRepository = PostgresDataSource.getRepository(Review);
    const imgReviewRepository = PostgresDataSource.getRepository(ImgReview);
    const orderItemRepository = PostgresDataSource.getRepository(OrderItem);

    const review = reviewRepository.create({
      product: { id: reviewData.productId },
      user: { id: reviewData.userId },
      rating: reviewData.rating,
      comment: reviewData.comment,
      orderItem: { id: reviewData.orderItemId },
    });
    await reviewRepository.save(review);

    if (reviewData.imageUrls && reviewData.imageUrls.length > 0) {
      const imgReviews = reviewData.imageUrls.map(({ imageUrl, publicId }) =>
        imgReviewRepository.create({
          review,
          imageUrl,
          publicId,
        })
      );
      await imgReviewRepository.save(imgReviews);
    }

    //update order item is checked
    await orderItemRepository.update(reviewData.orderItemId, { isRated: true });

    return review;
  }

  async deleteReview(reviewId: number): Promise<void> {
    try {
      const reviewRepository = PostgresDataSource.getRepository(Review);
      await reviewRepository.delete(reviewId);
      
    } catch (error) {
      throw new Error(`Error deleting review: ${error}`);
    }
  }

  async getProductReviews(
    productId: number,
    page: number,
    limit: number
  ): Promise<{
    reviews: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    try {
      const skip = (page - 1) * limit;

      const reviewRepository = PostgresDataSource.getRepository(Review);
      const [reviews, total] = await reviewRepository.findAndCount({
        where: { product: { id: productId } },
        relations: ["user", "imgReviews"],
        skip: skip,
        take: limit,
        order: {
          createdAt: "DESC",
        },
      });

      const formattedReviews = reviews.map((review) => ({
        id: review.id,
        user: {
          name: review.user.username,
          avatar: review.user.avatar,
        },
        rating: review.rating,
        createAt: review.createdAt.toISOString().split("T")[0],
        comment: review.comment,
        images: review.imgReviews?.map((imgReview) => imgReview.imageUrl),
      }));

      return {
        reviews: formattedReviews,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(`Error finding and paginating entities: ${error}`);
    }
  }
}
