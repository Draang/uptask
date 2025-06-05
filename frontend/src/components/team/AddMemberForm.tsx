import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TeamMemberForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMsg";
import { findUserByEmail } from "@/api/teamApi";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: "",
  };
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const mutation = useMutation({
    mutationFn: findUserByEmail,
    onError: (error) => {
      toast(error.message, {
        type: "error",
      });
    },
    onSuccess: () => {
      toast("Usuario encontrado", {
        type: "success",
      });
    },
  });

  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = { projectId, formData };
    mutation.mutate(data);
  };
  const resetData = () => {
    reset();

    mutation.reset();
    queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
  };
  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label className="font-normal text-2xl" htmlFor="name">
            E-mail de Usuario
          </label>
          <input
            id="name"
            type="text"
            placeholder="E-mail del usuario a Agregar"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          value="Buscar Usuario"
        />
      </form>
      <div className="mt-10">
        {mutation.isPending && <Spinner />}
        {mutation.error && (
          <h1 className="text-center">{mutation.error.message}</h1>
        )}
        {mutation.data && (
          <SearchResult user={mutation.data} reset={resetData} />
        )}
      </div>
    </>
  );
}
