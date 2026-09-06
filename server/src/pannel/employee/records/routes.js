import express from "express";
import { downloadAttendancePdf } from "../records/controller.js";
import { verifyToken } from "../auth/auth.middlware.js";

const router = express.Router();

router.get("/attendance-report", verifyToken, downloadAttendancePdf);

export default router;
