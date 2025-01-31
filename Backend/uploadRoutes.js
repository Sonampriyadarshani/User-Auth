import express from "express";
import { uploadCSV } from "../controllers/uploadController.js";
import multer from "multer";  // For handling file uploads

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("csv"), uploadCSV);

export default router;
