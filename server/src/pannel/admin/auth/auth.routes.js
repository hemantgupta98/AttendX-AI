import express from "express";
import jwt from "jsonwebtoken";
import { signup } from "./auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);

export default router;
