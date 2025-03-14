import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Menentukan lokasi penyimpanan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter jenis file
const fileFilter = (req, file, cb) => {
  const fileTypes = /mp4|avi|mkv|mov/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    return cb(null, true);
  }
  cb(new Error("Format file tidak didukung!"));
};

// Konfigurasi multer
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Maksimum 100MB
  fileFilter,
}).single("video");

export default upload;
