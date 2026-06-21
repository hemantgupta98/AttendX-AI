import express from "express";
import auth from "../auth/auth.routes.js";
import liveImage from "../live-image/liveImage.routes.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/live-image", liveImage);

export default router;
