import { isAxiosError } from "axios";
import api from "@/lib/axios";
import {
  teamMemberSchema,
  teamMembersSchema,
  type TeamMember,
  type TeamMemberForm,
} from "../types";

export async function findUserByEmail({
  formData,
  projectId,
}: {
  formData: TeamMemberForm;
  projectId: string;
}) {
  try {
    const url = `/projects/${projectId}/team/find`;
    const { data } = await api.post(url, formData);
    const result = teamMemberSchema.safeParse(data);

    if (result.success) {
      return result.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function addUserMemberById({
  projectId,
  id,
}: {
  projectId: string;
  id: TeamMember["_id"];
}) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.post(url, { id });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function getProjectTeam(projectId: string) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.get(url);
    const res = teamMembersSchema.safeParse(data);
    if (res.success) {
      return res.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
export async function deleteUserMemberById({
  projectId,
  id,
}: {
  projectId: string;
  id: TeamMember["_id"];
}) {
  try {
    const url = `/projects/${projectId}/team/${id}`;
    const { data } = await api.delete(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
