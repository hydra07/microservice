import { PostgresDataSource } from "@/config/db.config";
import { Review } from "@/entity/review.entity";
import { ImgReview } from "@/entity/imgReview.entity";
import { CreateReviewDto } from "@/dto/create-review.dto";

export default class ReviewService {
  async saveReview(reviewData: CreateReviewDto): Promise<Review> {
    const reviewRepository = PostgresDataSource.getRepository(Review);
    const imgReviewRepository = PostgresDataSource.getRepository(ImgReview);

    const review = reviewRepository.create(reviewData);
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
    return review;
  }
  
}