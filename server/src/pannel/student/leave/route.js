import { verifyToken } from "../auth/auth.middlware.js";
import upload from "../../../controllers/multer.js";
import {
  applyLeave,
  getStudentLeaves,
  deleteLeave,
  updateLeave,
} from "./controller.js";
import express from "express";
import { verifyToken as employeeToken } from "../../employee/auth/auth.middlware.js";

const router = express.Router();

router.post("/apply", verifyToken, upload.single("attachment"), applyLeave);
router.get("/getLeaves", verifyToken, getStudentLeaves);
router.get("/employee/getLeaves", employeeToken, getStudentLeaves);
router.delete("/delete/:id", verifyToken, deleteLeave);
router.patch("/update/:id", employeeToken, updateLeave);

export default router;
