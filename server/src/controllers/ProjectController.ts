import type { Request, Response } from "express";
import Project from "../models/Project";
export class ProjectController {
  static async createProject(request: Request, response: Response) {
    const project = new Project(request.body);
    try {
      const projectSave = await project.save();

      response.send("projecto creado correctamente");
    } catch (error) {
      console.error(error);
    }
  }
  static async getAllProjects(request: Request, response: Response) {
    try {
      const projects = await Project.find({});
      response.json(projects);
    } catch (error) {
      console.error(error);
    }
  }
  static async getProjectById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const project = await Project.findById(id).populate("tasks");
      if (!project) {
        response.status(404).json({ error: "Proyecto no encontrado" });
        return;
      }
      response.json(project);
    } catch (error) {
      console.error(error);
    }
  }
  static async updateProject(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const project = await Project.findByIdAndUpdate(id, request.body);
      if (!project) {
        response.status(404).json({ error: "Proyecto no encontrado" });
        return;
      }
      response.send("Proyecto actualizado");
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteProject(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        response.status(404).json({ error: "Proyecto no encontrado" });
      }
      response.send(`proyecto ${project.projectName} eliminado`);
    } catch (error) {
      console.error(error);
    }
  }
}
