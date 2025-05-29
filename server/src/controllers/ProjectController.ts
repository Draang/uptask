import type { Request, Response } from "express";
import Project from "../models/Project";
export class ProjectController {
  static async createProject(request: Request, response: Response) {
    const project = new Project({ ...request.body, manager: request.user.id });
    try {
      const projectSave = await project.save();
      response.json({
        message: "Proyecto creado correctamente",
        id: projectSave._id,
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
  static async getAllProjects(request: Request, response: Response) {
    try {
      const projects = await Project.find({
        $or: [
          {
            manager: { $in: request.user.id },
          },
        ],
      });
      response.json(projects);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
  static async getProjectById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const project = await Project.findOne({
        _id: id,
        manager: request.user.id,
      }).populate("tasks");
      if (!project) {
        response.status(404).json({ error: "Proyecto no encontrado" });
        return;
      }
      response.json(project);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
  static async updateProject(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const project = await Project.findOneAndUpdate(
        {
          _id: id,
          manager: request.user.id,
        },
        request.body
      );
      if (!project) {
        response.status(404).json({ error: "Proyecto no encontrado" });
        return;
      }
      response.send("Proyecto actualizado");
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  static async deleteProject(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const project = await Project.findOneAndDelete({
        _id: id,
        manager: request.user.id,
      });
      if (!project) {
        response.status(404).json({ error: "Proyecto no encontrado" });
      }
      response.send(`proyecto ${project.projectName} eliminado`);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
