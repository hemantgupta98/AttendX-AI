import express from "express";
import auth from "../auth/auth.routes.js";
import liveImage from "../live-image/liveImage.routes.js";
import verified from "../aiService/ai.live-route.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/live-image", liveImage);
router.use("/verified", verified);

export default router;
