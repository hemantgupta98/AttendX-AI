import express from "express";
import { signup, login } from "./auth.controllers.js";
import upload from "../../../controllers/multer.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), signup);
router.post("/login", login);

export default router;
