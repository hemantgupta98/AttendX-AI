import express from "express";
import { signup, login, getProfile, logout } from "./auth.controllers.js";
import upload from "../../../controllers/multer.js";
import { verifyToken } from "./auth.middlware.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), signup);
router.post("/login", login);
router.get("/getprofile", verifyToken, getProfile);
router.post("/logout", logout);

export default router;
