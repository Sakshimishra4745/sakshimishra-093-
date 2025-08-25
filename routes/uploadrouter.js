
import upload from "../config/multer.js";
import express from 'express';
import { uploadFile } from "../controllers/uploadcontroller.js";

const fileRouter = express.Router()

fileRouter.post('/', upload.single('image'), uploadFile);

export default fileRouter