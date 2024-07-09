import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import ReviewService from "@/service/review.service";
import { CreateReviewDto } from "@/dto/create-review.dto";

export default class ReviewController {
  private reviewService = new ReviewService();

  saveReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewData = plainToInstance(CreateReviewDto, req.body);

      const errors = await validate(reviewData);
      if (errors.length > 0) {
        console.log(errors, 'errors')
        return res.status(400).json({ errors });
      }

      const review = await this.reviewService.saveReview(reviewData);
      console.log(review, 'review')
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  };

  public getProductReviews = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
      const productId = parseInt(req.params.productId, 10);
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 3;

      const reviews = await this.reviewService.getProductReviews(productId, page, limit);
      res.status(200).json(reviews);
    } catch (error) {
      next(error)
    }
  }

  public deleteReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reviewId = parseInt(req.params.reviewId, 10);
      const result = await this.reviewService.deleteReview(reviewId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}   