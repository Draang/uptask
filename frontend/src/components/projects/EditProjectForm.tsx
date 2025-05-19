import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectById } from "@/api/projectApi";
import { toast } from "react-toastify";
type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: string;
};
export default function EditProjectForm({
  data,
  projectId,
}: EditProjectFormProps) {
  const initialValues: ProjectFormData = {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateProjectById,
    onError: (error) => {
      toast(error.message, {
        type: "error",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast(data, {
        type: "success",
      });
      navigate("/");
    },
  });
  const navigate = useNavigate();
  const handleForm: SubmitHandler<ProjectFormData> = (data) => {
    mutation.mutate({ projectId, formData: data });
  };
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario
        </p>
        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold"
            to={"/"}
          >
            Volver a Proyectos
          </Link>
        </nav>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value="Guardar cambios"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase hover:bg-fuchsia-700 font-bold  cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
