import { sendStudentMail, sendTeacherMail } from "./invite.controller.js";
import express from "express";
import { verifyToken } from "../auth/auth.middlware.js";

const router = express.Router();

router.post("/student/mail", verifyToken, sendStudentMail);
router.post("/teacher/mail", verifyToken, sendTeacherMail);

export default router;
