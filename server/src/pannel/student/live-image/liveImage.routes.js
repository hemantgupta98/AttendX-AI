import express from "express";
import upload from "../../../controllers/multer.js";
import { uploadStudentImage } from "./liveImage.controller.js";

const router = express.Router();

router.post("/upload/student", upload.single("image"), uploadStudentImage);

export default router;
