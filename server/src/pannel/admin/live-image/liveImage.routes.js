import express from "express";
import upload from "../../../controllers/multer.js";
import { uploadAdminImage } from "./liveImage.controller.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadAdminImage);

export default router;
