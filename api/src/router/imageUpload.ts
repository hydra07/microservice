import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import env from "@/util/validateEnv";
import { Router } from "express";
import fs from "fs/promises"; // Use promises API to handle files
import { ImgProductService } from "@/service/imgProduct.service";

const ImageUploadRouter = Router();

const upload = multer({ dest: "uploads/" });

const imageProdutService = new ImgProductService();

cloudinary.v2.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
});

ImageUploadRouter.get("/uploadImg", (req: Request, res: Response) => {
  res.send("Upload image");
});

ImageUploadRouter.post(
  "/uploadImg",
  upload.array("files"),
  async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];
      const imageId = req.body.imageId;

      const uploads = await Promise.all(
        files.map(async (file) => {
          try {
            const result = await cloudinary.v2.uploader.upload(file.path, {
              resource_type: "auto",
              folder: env.CLOUD_IMG_FOLDER,
            });
            console.log("Uploaded file:", result);
            await fs.unlink(file.path); // Remove file after successful upload

            console.log("Image ID:", imageId);
            if (imageId) {
              const deletedImg = await imageProdutService.delete({
                where: { id: imageId },
              });
              if (deletedImg && deletedImg.publicId) {
                await cloudinary.v2.uploader.destroy(deletedImg.publicId);
              }
            }

            return {
              publicId: result.public_id,
              imageUrl: result.secure_url,
              id: imageId,
            };
          } catch (uploadError) {
            console.error("Error uploading file to Cloudinary:", uploadError);
            throw uploadError;
          }
        })
      );

      res.json(uploads);
    } catch (error) {
      console.error("Error processing file upload:", error);
      res.status(500).json({ error: "Error uploading files" });
    }
  }
);


//delete image of product 
ImageUploadRouter.delete("/uploadImg/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedImg = await imageProdutService.delete({
      where: { id: parseInt(id) },
    });
    if (deletedImg && deletedImg.publicId) {
      await cloudinary.v2.uploader.destroy(deletedImg.publicId);
    }
    res.json(deletedImg);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Error deleting image" });
  }
}
);

export default ImageUploadRouter;
