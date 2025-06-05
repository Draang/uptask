import { isAxiosError } from "axios";
import api from "@/lib/axios";
import {
  teamMemberSchema,
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
