import { verifyToken } from "../auth/auth.middlware.js";
import upload from "../../../controllers/multer.js";
import { applyLeave, getEmployeeLeaves, deleteLeave } from "./controller.js";
import express from "express";

const router = express.Router();

router.post("/apply", verifyToken, upload.single("attachment"), applyLeave);
router.get("/getLeaves", verifyToken, getEmployeeLeaves);
router.delete("/delete/:id", verifyToken, deleteLeave);

export default router;
