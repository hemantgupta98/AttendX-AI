import express from "express";
import { employeeVerify } from "./ai.live.controller.js";

const router = express.Router();

router.post("/attendance", employeeVerify);

export default router;
