import express from "express";
import { signup, login, getProfile } from "./auth.controllers.js";
import { verifyToken } from "./auth.middlware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToken, getProfile);

export default router;
