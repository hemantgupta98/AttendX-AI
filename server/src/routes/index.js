import express from "express";
import admin from "../pannel/admin/routes/index.js";

const router = express.Router();

router.use("/admin", admin);

export default router;
