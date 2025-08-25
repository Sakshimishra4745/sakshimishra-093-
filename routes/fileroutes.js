import express from "express";
import multer from "multer";
import { uploadFile, downloadFile } from "../controllers/filecontroller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.post("/upload", verifyToken, upload.single("file"), uploadFile);

router.get("/download/:id", downloadFile);

export default router;
