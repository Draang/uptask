import api from "@/lib/axios";
import type { TaskFormData, Project } from "./../types/index";
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
