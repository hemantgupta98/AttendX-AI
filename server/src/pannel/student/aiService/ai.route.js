import express from "express";
import { studentVerify } from "./ai.live.controller.js";

const router = express.Router();

router.post("/attendance", studentVerify);

export default router;
