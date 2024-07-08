import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import env from "@/util/validateEnv";
import ReviewController from "@/controller/review.controller";

const upload = multer({ dest: "uploads/" });
const reviewRouter = express.Router();
const reviewController = new ReviewController();

reviewRouter.post("/review", upload.array("images"), async (req, res, next) => {
  try {
    if (req.files && (req.files.length as number) > 0) {
      const files = req.files as Express.Multer.File[];

      const uploads = files.map(async (file) => {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          resource_type: "auto",
          folder: env.CLOUD_IMG_FOLDER_RATING,
        });
        await fs.unlink(file.path);
        return { publicId: result.public_id, imageUrl: result.secure_url };
      });

      const uploadedFiles = await Promise.all(uploads);
      const imageUrls = uploadedFiles.map((file) => ({
          imageUrl: file.imageUrl,
          publicId: file.publicId,
        }));
      req.body.imageUrls = imageUrls;
    } else {
      req.body.imageUrls = [];
    }

    req.body.rating = parseInt(req.body.rating);
    req.body.productId = parseInt(req.body.productId);
    req.body.orderItemId = parseInt(req.body.orderItemId);
    return await reviewController.saveReview(req, res, next);
  } catch (error) {
    next(error);
  }
});


reviewRouter.get('/product/:productId/reviews', reviewController.getProductReviews);


export default reviewRouter;
