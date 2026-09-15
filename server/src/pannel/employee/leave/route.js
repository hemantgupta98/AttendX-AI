import { verifyToken } from "../auth/auth.middlware.js";
import upload from "../../../controllers/multer.js";
import {
  applyLeave,
  getEmployeeLeaves,
  deleteLeave,
  updateLeave,
} from "./controller.js";
import express from "express";
import { verifyToken as adminToken } from "../../admin/auth/auth.middlware.js";

const router = express.Router();

router.post("/apply", verifyToken, upload.single("attachment"), applyLeave);
router.get("/getLeaves", verifyToken, getEmployeeLeaves);
router.delete("/delete/:id", verifyToken, deleteLeave);
router.patch("/update/:id", adminToken, updateLeave);

export default router;
