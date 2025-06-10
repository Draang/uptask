import { isAxiosError } from "axios";
import type { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";
type NoteApiProps = {
  formData: NoteFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
};
export async function createNote({
  formData,
  projectId,
  taskId,
}: Pick<NoteApiProps, "formData" | "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error en respuesta");
  }
}
export async function deleteNote({
  noteId,
  projectId,
  taskId,
}: Pick<NoteApiProps, "noteId" | "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error en respuesta");
  }
}
