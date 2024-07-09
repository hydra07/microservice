import { Request, Router } from "express";
// import upload from '../config/storage.config';
import upload from "@/util/upload";

const router = Router();
router.post(
  "/uploads/post",
  upload("post").single("image"),
  (req: Request, res) => {
    // const filePath = req.file.path;
    // res.json({ filePath });
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({
      message: "File uploaded successfully",
      file: req.file,
      filePath: req.filePath,
    });
  },
);

router.post(
  "/uploads/recipe",
  upload("recipe").array("files", 5),
  (req: Request, res) => {
    if (req.files && Array.isArray(req.files)) {
      const filePaths = req.files.map(
        (file) => `uploads/recipe/${file.filename}`,
      );
      res.json({
        message: "Files uploaded successfully",
        filePaths: filePaths,
      });
    } else {
      res.status(400).json({ message: "No files uploaded" });
    }
  },
);

export default router;
