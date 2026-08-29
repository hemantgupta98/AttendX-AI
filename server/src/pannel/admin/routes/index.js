import express from "express";
import auth from "../auth/auth.routes.js";
import liveImage from "../live-image/liveImage.routes.js";
import verified from "../aiService/ai.live-route.js";
import getTeacher from "../connection/route.js";
import inviteMail from "../invite/invite.mail.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/live-image", liveImage);
router.use("/verified", verified);
router.use("/connection", getTeacher);
router.use("/invite", inviteMail);

export default router;
