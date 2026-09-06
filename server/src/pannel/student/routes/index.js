import express from "express";
import auth from "../auth/auth.routes.js";
import liveImage from "../live-image/liveImage.routes.js";
import leave from "../leave/route.js";
import report from "../records/routes.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/live-image", liveImage);
router.use("/leave", leave);
router.use("/report", report);

export default router;
