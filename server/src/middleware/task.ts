import type { Request, Response, NextFunction } from "express";

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
