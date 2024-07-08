import { Request } from "express";
import fs from "fs";
import multer, { diskStorage } from "multer";
import path from "path";

/**
 *
 * @param folderName
 * @param fileType example: 'image'
 * @returns
 *
 * This function is used to upload files to the server.
 * @example
 * app.post('/upload', createUploadService('post').single('image'), (req, res) => {
 *  res.send({
 *    filePath: req.filePath
 *  })
 * });
 */
function uploadService(folderName: string) {
  const storage = diskStorage({
    destination: function (req: Request, file, cb) {
      const dir = path.join(__dirname, `../../../uploads/${folderName}`);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: function (req: Request, file, cb) {
      const fileName = Date.now() + path.extname(file.originalname);
      // req.filePath = path.join(
      //   __dirname,
      //   `../../../uploads/${folderName}/${fileName}`,
      // );
      req.filePath = `uploads/${folderName}/${fileName}`;
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  return multer({ storage: storage });
}

export default uploadService;
