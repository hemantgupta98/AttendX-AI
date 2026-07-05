import express from "express";
import upload from "../../../controllers/multer.js";
import { uploadEmployeeImage } from "./liveImage.controller.js";
import { verifyToken } from "../auth/auth.middlware.js";
import { getAttendance } from "./liveImage.controller.js";

const router = express.Router();

router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  uploadEmployeeImage,
);
router.get("/getattendance", verifyToken, getAttendance);

export default router;
