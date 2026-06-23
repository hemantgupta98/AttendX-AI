import express from "express";
import { adminVerify } from "./ai.live-controlller.js";

const router = express.Router();

router.post("/attendance", adminVerify);

export default router;
