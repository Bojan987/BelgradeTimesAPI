import multer from "multer";
import path from "path";
import fs from "fs";

export const uploadImage = (folder, fileName) => {
  const imagePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    `public/static/images/${folder}/`
  );

  const storage = multer.diskStorage({
    destination(req, file, next) {
      next(null, imagePath);
    },
    filename(req, file, next) {
      next(null, `${new Date().valueOf()}.jpg`);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 }
  });

  return upload;
};
