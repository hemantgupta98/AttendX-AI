import express from "express";
import { downloadAttendancePdf } from "../records/controller.js";

const router = express.Router();

router.get("/attendance-report", downloadAttendancePdf);

export default router;
