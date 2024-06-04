import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import env from "@/util/validateEnv";
import { Router } from "express";
import fs from "fs/promises"; // Use promises API to handle files

const ImageUploadRouter = Router();

const upload = multer({ dest: "uploads/" });

cloudinary.v2.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
});

ImageUploadRouter.post('/uploadImg', upload.array('files'), async (req: Request, res: Response) => {
  console.log('Received upload request');
  try {
    const files = req.files as Express.Multer.File[];
    console.log('Files to upload:', files);
    const uploads = await Promise.all(
      files.map(async (file) => {
        try {
          const result = await cloudinary.v2.uploader.upload(file.path, {
            resource_type: "auto",
            folder: env.CLOUD_IMG_FOLDER,
          });
          console.log('Uploaded file:', result);
          await fs.unlink(file.path); // Remove file after successful upload
          return result.public_id;
        } catch (uploadError) {
          console.error('Error uploading file:', uploadError);
          throw uploadError;
        }
      })
    );
    res.json(uploads);
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: "Error uploading files" });
  }
});

export default ImageUploadRouter;
