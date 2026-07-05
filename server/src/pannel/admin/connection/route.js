import express from "express";
import { getTeacher, getStudent } from "./controller.js";
import { verifyToken } from "../auth/auth.middlware.js";

const router = express.Router();

router.get("/getTeachers", verifyToken, getTeacher);
router.get("/getStudents", verifyToken, getStudent);

export default router;
