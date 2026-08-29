import { sendStudentMail } from "./invite.controller.js";
import express from "express";

const router = express.Router();

router.post("/student/mail", sendStudentMail);

export default router;
