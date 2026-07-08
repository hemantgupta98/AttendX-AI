import express from "express";
import upload from "../../../controllers/multer.js";
import { uploadAdminImage } from "./liveImage.controller.js";
import { verifyToken } from "../auth/auth.middlware.js";
import { getAttendance, getAttendanceHistory } from "./liveImage.controller.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("image"), uploadAdminImage);
router.get("/getattendance", verifyToken, getAttendance);
router.get("/history", verifyToken, getAttendanceHistory);

export default router;
