import express from "express";
import upload from "../../../controllers/multer.js";
import { uploadEmployeeImage } from "./liveImage.controller.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadEmployeeImage);

export default router;
