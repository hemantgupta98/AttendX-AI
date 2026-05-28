import express from "express";
import cors from "cors";
import corsOption from "./config/cors.js";
import allRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
app.use(cors(corsOption));
app.options(/.*/, cors(corsOption));

app.use("/api", allRoutes);

export default app;
