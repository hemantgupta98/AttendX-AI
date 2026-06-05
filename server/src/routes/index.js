import express from "express";
import admin from "../pannel/admin/routes/index.js";
import employee from "../pannel/employee/routes/index.js";
import student from "../pannel/student/routes/index.js";
import upload from "../controllers/multer.js";
import { uploadImage } from "../controllers/cloudinary.js";

const router = express.Router();

router.use("/admin", admin);
router.use("/employee", employee);
router.use("/student", student);
router.post("/images/upload", upload.single("image"), uploadImage);

export default router;
