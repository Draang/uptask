import { addUserMemberById } from "@/api/teamApi";
import type { TeamMember } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};
export default function SearchResult({ user, reset }: SearchResultProps) {
  const params = useParams();
  const projectId = params.projectId!;
  const mutation = useMutation({
    mutationFn: addUserMemberById,
    onError: (error) => {
      toast(error.message, {
        type: "error",
      });
    },
    onSuccess: (data) => {
      toast(data, {
        type: "success",
      });
      reset();
      
    },
  });
  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado</p>
      <div className="flex justify-between items-center">
        <p className="italic">{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={() => mutation.mutate({ projectId, id: user._id })}
        >
          Agregar al Proyecto
        </button>
      </div>
    </>
  );
}
