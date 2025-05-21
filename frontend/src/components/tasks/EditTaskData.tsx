import { getTaskById } from "@/api/taskApi";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

type EditTaskDataProps = {
  projectId: string;
};
export default function EditTaskData({ projectId }: EditTaskDataProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;
  const { data } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ taskId, projectId }),
    enabled: !!taskId,
  });
  if (data)
    return <EditTaskModal data={data} projectId={projectId} taskId={taskId} />;
}
