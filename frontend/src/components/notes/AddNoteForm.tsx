import type { NoteFormData, Project, Task } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMsg from "../ErrorMsg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/notesApi";
import { toast } from "react-toastify";
type AddNoteFormProps = {
  projectId: Project["_id"];
  taskId: Task["_id"];
};
export default function AddNoteForm({ projectId, taskId }: AddNoteFormProps) {
  const initValues: NoteFormData = {
    content: "",
  };

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initValues });

  const mutation = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      reset();
    },
  });
  const handleAddNote = (formData: NoteFormData) => {
    mutation.mutate({ projectId, taskId, formData });
  };
  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Crear Nota
        </label>
        <input
          type="text"
          id="content"
          placeholder="Contenido de la nota,..,"
          className="w-full p-3 border border-gray-300 "
          {...register("content", {
            required: "El contenido de la nota es obligatorio",
          })}
        />
        {errors.content && <ErrorMsg>{errors.content.message}</ErrorMsg>}
      </div>
      <input
        type="submit"
        value="Crear Nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
      />
    </form>
  );
}
