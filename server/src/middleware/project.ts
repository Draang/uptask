import { IProject } from "./../models/Project";
import type { Request, Response, NextFunction } from "express";
import Project from "../models/Project";

declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}
export async function validateProjectExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ error: "Proyecto no encontrado" });
      return;
    }
    req.project = project;
    next();
  } catch (error) {
    res.send(500).json({ error: error.message });
  }
}
