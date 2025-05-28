import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/Auth";
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error("No autorizado");
    res.status(401).json({ error: error.message });
  }
  const token = bearer.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decode === "object" && decode.id) {
      const user = await User.findById(decode.id).select("_id name email");
      if (user) {
        req.user = user;
      } else {
        res.status(500).json({ error: "Token no valido" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Token no valido" });
  }
  next();
}
