import { getProjectById } from "@/api/projectApi";
import Spinner from "@/components/Spinner";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailView() {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to={"/404"} />;
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light mt-5 text-gray-500">
          {data.description}
        </p>
        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white cursor-pointer font-bold transition-colors"
            onClick={() => navigate("?newTask=true")}
          >
            Agregar Tarea
          </button>
        </nav>
        <AddTaskModal />
      </>
    );
}
