import express from "express";
import admin from "../pannel/admin/routes/index.js";
import employee from "../pannel/employee/routes/index.js";
import student from "../pannel/student/routes/index.js";
import liveImage from "../pannel/employee/live-image/liveImage.routes.js";

const router = express.Router();

router.use("/admin", admin);
router.use("/employee", employee);
router.use("/student", student);
router.use("/ai", liveImage);

export default router;
