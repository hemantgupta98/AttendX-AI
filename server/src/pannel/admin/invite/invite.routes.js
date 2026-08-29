import sendStudentInvite from "./invite.mail.js";
import express from "express";

const router = express.Router();

router.post("/student/mail", sendStudentInvite);

export default router;
