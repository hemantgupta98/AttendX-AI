import express from "express";
import { getTeacher, getStudent } from "./controller.js";
import { verifyToken } from "../auth/auth.middlware.js";
import { deleteStudent, deleteTeacher } from "./delete.controller.js";

const router = express.Router();

router.get("/getTeachers", verifyToken, getTeacher);
router.get("/getStudents", verifyToken, getStudent);
router.delete("/deleteStudent/:id", verifyToken, deleteStudent);
router.delete("/deleteTeacher/:id", verifyToken, deleteTeacher);

export default router;
