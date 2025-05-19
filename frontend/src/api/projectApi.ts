import api from "@/lib/axios";
import {
  dashboardProjectSchema,
  projectSchema,
  type Project,
  type ProjectFormData,
} from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function getProjects() {
  try {
    const { data } = await api.get("/projects");
    const response = dashboardProjectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    } else {
      throw new Error("Error en respuesta");
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function getProjectById(projectId: Project["_id"]) {
  try {
    const { data } = await api.get(`/projects/${projectId}`);
    const response = projectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    } else {
      throw new Error("Error en respuesta");
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error en respuesta");
  }
}
export async function updateProjectById({
  projectId,
  formData,
}: {
  projectId: Project["_id"];
  formData: ProjectFormData;
}) {
  try {
    const { data } = await api.put(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error en respuesta");
  }
}
export async function deleteProject(projectId: Project["_id"]) {
  try {
    const { data } = await api.delete(`/projects/${projectId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error en respuesta");
  }
}
