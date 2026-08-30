import { sendStudentMail, sendTeacherMail } from "./invite.controller.js";
import express from "express";

const router = express.Router();

router.post("/student/mail", sendStudentMail);
router.post("/teacher/mail", sendTeacherMail);

export default router;
