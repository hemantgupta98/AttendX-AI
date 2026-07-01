import express from "express";
import { getTeacher } from "./controller.js";
import { verifyToken } from "../auth/auth.middlware.js";

const router = express.Router();

router.get("/getTeachers", verifyToken, getTeacher);

export default router;
