import { getProjectById } from "@/api/projectApi";
import Spinner from "@/components/Spinner";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskDetailsModal from "@/components/tasks/TaskDetailsModal";
import TaskList from "@/components/tasks/TaskList";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function ProjectDetailView() {
  const { data: user, isLoading: isAuthLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading || isAuthLoading) return <Spinner />;
  if (isError) return <Navigate to={"/404"} />;
  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light mt-5 text-gray-500">
          {data.description}
        </p>
        {isManager(data.manager, user?._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white cursor-pointer font-bold transition-colors"
              onClick={() => navigate(location.pathname + "?newTask=true")}
            >
              Agregar Tareas
            </button>
            <Link
              to={"team"}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white cursor-pointer font-bold transition-colors"
            >
              Colaboradores
            </Link>
          </nav>
        )}
        <TaskList tasks={data.tasks} />
        <AddTaskModal projectId={projectId} />
        <EditTaskData projectId={projectId} />
        <TaskDetailsModal projectId={projectId} />
      </>
    );
}
