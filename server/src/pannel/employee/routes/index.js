import express from "express";
import auth from "../auth/auth.routes.js";
import liveImage from "../live-image/liveImage.routes.js";
import verified from "../aiService/ai.route.js";
import leave from "../leave/route.js";
import report from "../records/routes.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/live-image", liveImage);
router.use("/verified", verified);
router.use("/leave", leave);
router.use("/report", report);

export default router;
