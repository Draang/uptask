import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";
declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}
export async function validateTaskExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ error: "Hubo un error" });
      return;
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}
export async function validateTaskOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.task.project.toString() !== req.project.id.toString()) {
      res.status(404).json({ error: "Hubo un error" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}
export function hasAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user.id.toString() !== req.project.manager.toString()) {
    res.status(400).json({ error: "Accion no valida" });
    return;
  }
  next();
}
