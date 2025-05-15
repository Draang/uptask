import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/bd";
import projectRouter from "./routes/projectRoutes";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
//Routes
app.use("/api/projects", projectRouter);
export default app;
