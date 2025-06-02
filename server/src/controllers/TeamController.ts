import { type Request, type Response } from "express";
import User from "../models/Auth";
import Project from "../models/Project";
export class TeamController {
  static async findMemberByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email }).select("id email name");
      if (!user) {
        throw new Error("Usuario no encontrado", { cause: 404 });
      }
      res.json(user);
    } catch (error) {
      const codeError = error.cause ?? 500;
      res.status(codeError).json({ error: error.message });
    }
  }
  static async addMemberById(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const user = await User.findById(id);
      if (!user) {
        throw new Error("Usuario no encontrado", { cause: 404 });
      }
      if (req.project.team.some((member) => member == user.id)) {
        throw new Error("Usuario ya esta en el proyecto", { cause: 409 });
      }
      req.project.team.push(user.id);
      await req.project.save();
      res.send("Usuario agregado correctamente");
    } catch (error) {
      const codeError = error.cause ?? 500;
      res.status(codeError).json({ error: error.message });
    }
  }
  static async removeMemberById(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!req.project.team.some((member) => member == id)) {
        throw new Error("Usuario no esta en el proyecto", { cause: 409 });
      }
      req.project.team = req.project.team.filter((member) => member != id);
      await req.project.save();
      res.send("Usuario eliminado correctamente");
    } catch (error) {
      const codeError = error.cause ?? 500;
      res.status(codeError).json({ error: error.message });
    }
  }
  static async getProjectTeam(req: Request, res: Response) {
    try {
      const project = await Project.findById(req.project.id).populate({
        path: "team",
        select: "id email name",
      });
      res.json(project.team);
    } catch (error) {
      const codeError = error.cause ?? 500;
      res.status(codeError).json({ error: error.message });
    }
  }
}
