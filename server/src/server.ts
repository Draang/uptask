import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/bd";
import authRoutes from "./routes/authRoutes";
import projectRouter from "./routes/projectRoutes";
import cors from "cors";
import { corsConfig } from "./config/cors";
import morgan from "morgan";
dotenv.config();
connectDB();
const app = express();
app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(express.json());
//Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRouter);
export default app;
