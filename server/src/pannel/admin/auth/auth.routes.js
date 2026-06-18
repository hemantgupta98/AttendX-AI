import express from "express";
import { signup, login, getProfile } from "./auth.controllers.js";
import { verifyToken } from "./auth.middlware.js";
import upload from "../../../controllers/multer.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), signup);
router.post("/login", login);
router.get("/me", verifyToken, getProfile);

export default router;
