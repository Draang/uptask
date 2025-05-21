import api from "@/lib/axios";
import { type TaskFormData, type Project, type Task } from "./../types/index";
import { isAxiosError } from "axios";
export async function createTask({
  formData,
  projectId,
}: {
  formData: TaskFormData;
  projectId: Project["_id"];
}) {
  try {
    const { data } = await api.post(`/projects/${projectId}/tasks`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function getTaskById({
  taskId,
  projectId,
}: {
  taskId: Task["_id"];
  projectId: Project["_id"];
}) {
  try {
    const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error consultando tarea");
  }
}
export async function updateTask({
  formData,
  taskId,
  projectId,
}: {
  formData: TaskFormData;
  taskId: Task["_id"];
  projectId: Project["_id"];
}) {
  try {
    const { data } = await api.put(
      `/projects/${projectId}/tasks/${taskId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function deleteTask({
  taskId,
  projectId,
}: {
  taskId: Task["_id"];
  projectId: Project["_id"];
}) {
  try {
    const { data } = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
