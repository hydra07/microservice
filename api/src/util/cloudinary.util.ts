import cloudinary from "cloudinary";
import fs from "fs/promises";

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string
) => {
  const result = await cloudinary.v2.uploader.upload(file.path, {
    resource_type: "auto",
    folder,
  });
  await fs.unlink(file.path);
  return result.secure_url;
};
