import express from "express";
import upload from "../../../controllers/multer.js";
import { uploadAdminImage } from "./liveImage.controller.js";
import { verifyToken } from "../auth/auth.middlware.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("image"), uploadAdminImage);

export default router;
