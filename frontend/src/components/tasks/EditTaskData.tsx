import { getTaskById } from "@/api/taskApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

type EditTaskDataProps = {
  projectId: string;
};
export default function EditTaskData({ projectId }: EditTaskDataProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;
  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ taskId, projectId }),
    enabled: !!taskId,
  });
  if (isError) return <Navigate to="/404" />;
  if (data)
    return <EditTaskModal data={data} projectId={projectId} taskId={taskId} />;
}
