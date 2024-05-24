import { Request, Router } from 'express';
// import upload from '../config/storage.config';
import upload from '@/util/upload';

const router = Router();
router.post('/uploads', upload('demo', 'image'), (req: Request, res) => {
  // const filePath = req.file.path;
  // res.json({ filePath });
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    message: 'File uploaded successfully',
    file: req.file,
    filePath: req.filePath,
  });
});

export default router;
