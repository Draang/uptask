import type { NextFunction, Request, Response } from "express";
import Task, { ITask } from "../models/Task";
import { ValidationChain } from "express-validator";

export class TaskController {
  static async createTask(request: Request<{}, {}, ITask>, response: Response) {
    try {
      const task = new Task();
      const { name, description } = request.body;
      task.name = name;
      task.description = description;
      task.project = request.project.id;
      request.project.tasks.push(task.id);
      const reses = await Promise.allSettled([
        task.save(),
        request.project.save(),
      ]);
      console.log(reses);
      response.json({ message: "Tarea creada", data: task });
    } catch (error) {
      console.error(error);
    }
  }
  static async getAllProjectTasks(request: Request, response: Response) {
    try {
      const { project } = request;
      //populate es como un join
      const tasks = await Task.find({ project: project.id }).populate(
        "project"
      );
      response.json(tasks);
    } catch (error) {
      response.status(500).json({ error: "Hubo un error" });
    }
  }
  static async getTask(request: Request, response: Response) {
    try {
      const task = await request.task.populate([
        {
          path: "notes",
          populate: { path: "createdBy", select: "id name email" },
        },
        {
          path: "updatedBy",
          select: "name email",
        },
      ]);
      response.json(task);
    } catch (error) {
      response.status(500).json({ error: "Hubo un error" });
    }
  }
  static async updateTask(request: Request, response: Response) {
    try {
      const task = await request.task.updateOne({}, { $set: request.body });
      response.json({ message: "Tarea actualizada", data: task });
    } catch (error) {
      response.status(500).json({ error: "Hubo un error" });
    }
  }
  static async deleteTask(request: Request, response: Response) {
    try {
      const { taskId } = request.params;
      const task = await Task.findOneAndDelete(
        { _id: taskId, project: request.project.id },
        request.body
      );
      if (!task) {
        response.status(404).json({ error: "Hubo un error" });
        return;
      }
      request.project.tasks = request.project.tasks.filter(
        (task) => task.id != taskId
      );
      await request.project.save();
      response.send("Tarea Eliminada correctamente");
    } catch (error) {
      response.status(500).json({ error: "Hubo un error" });
    }
  }
  static async updateTaskStatus(request: Request, response: Response) {
    try {
      const { status } = request.body;

      const task = await request.task.updateOne(
        {},
        { $set: { status, updatedBy: request.user.id } }
      );
      response.send(`Tarea: ${task.name} actualizada a Estado:${status}`);
    } catch (error) {
      response.status(500).json({ error: "Hubo un error" });
    }
  }
}
