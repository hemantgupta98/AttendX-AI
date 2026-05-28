import express from "express";
import admin from "../pannel/admin/routes/index.js";
import employee from "../pannel/employee/routes/index.js";

const router = express.Router();

router.use("/admin", admin);
router.use("/employee", employee);

export default router;
