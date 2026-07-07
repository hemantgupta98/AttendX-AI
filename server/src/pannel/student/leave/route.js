import { verifyToken } from "../auth/auth.middlware.js";
import upload from "../../../controllers/multer.js";
import { applyLeave, getStudentLeaves, deleteLeave } from "./controller.js";
import express from "express";

const router = express.Router();

router.post("/apply", verifyToken, upload.single("attachment"), applyLeave);
router.get("/getLeaves", verifyToken, getStudentLeaves);
router.delete("/delete/:id", verifyToken, deleteLeave);

export default router;
