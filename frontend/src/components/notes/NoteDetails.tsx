import { useAuth } from "@/hooks/useAuth";
import type { Note, Project, Task } from "@/types/index";
import { formatDate } from "@/utils/index";
import Spinner from "../Spinner";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/api/notesApi";
import { toast } from "react-toastify";
type NoteDetailsProps = {
  note: Note;
  projectId: Project["_id"];
  taskId: Task["_id"];
};
export default function NoteDetails({
  note,
  projectId,
  taskId,
}: NoteDetailsProps) {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data?._id, note.createdBy._id]);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });
  if (isLoading) return <Spinner />;
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p className="font-light text-xs text-slate-500">
          <span className="font-bold"> {note.createdBy.name}</span> -{" "}
          {formatDate(note.createdAt)}
        </p>
        <p>{note.content}</p>
      </div>
      {canDelete && (
        <button
          type="button"
          className="bg-red-500 hover:bg-red-600 p-2 text-xs text-white font-bold cursor-pointer"
          onClick={() =>
            mutation.mutate({ projectId, noteId: note["_id"], taskId })
          }
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
