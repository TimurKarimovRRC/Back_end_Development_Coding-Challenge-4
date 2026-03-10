import express from "express";
import morgan from "morgan";
import { healthRoutes } from "./api/v1/routes/healthRoutes";
import { projectRoutes } from "./api/v1/routes/projectRoutes";
import { adminRoutes } from "./api/v1/routes/adminRoutes";



export const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", healthRoutes);
app.use("/api/v1", projectRoutes);
app.use("/api/v1", adminRoutes);