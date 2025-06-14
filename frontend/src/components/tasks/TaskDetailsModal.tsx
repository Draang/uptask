import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById, updateTaskStatus } from "@/api/taskApi";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/index";
import { STATUS_TRANSLATIONS } from "@/locals/es";
import type { TaskStatus } from "@/types/index";
import NotesPanel from "../notes/NotesPanel";
type TaskDetailsModalProps = {
  projectId: string;
};
export default function TaskDetailsModal({ projectId }: TaskDetailsModalProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  const show = taskId ? true : false;

  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ taskId, projectId }),
    enabled: show,
    retry: false,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      toast(error.message, {
        type: "error",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getProject", projectId] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });

      toast(data, {
        type: "success",
      });
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    mutation.mutate({
      taskId,
      projectId,
      status: e.target.value as TaskStatus,
    });
  };
  if (isError) {
    toast.error("Error buscando proyecto", { toastId: "error" });
    return <Navigate to={`/proyects/${projectId}`} />;
  }
  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              navigate(location.pathname, { replace: true });
            }}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatDate(data.createdAt)}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formatDate(data.updatedAt)}
                    </p>
                    {data.updatedBy && (
                      <p className="text-slate-400 text-sm">
                        Ultima actualizacion de estado por:{" "}
                        {data.updatedBy.name}
                      </p>
                    )}
                    <DialogTitle
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                    >
                      {data.name}
                    </DialogTitle>
                    <p className="text-lg text-slate-500 mb-2">
                      Descripción: {data.description}
                    </p>
                    <div className="my-5 space-y-3">
                      <label className="font-bold" htmlFor="status">
                        Estado Actual:
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="w-full p-3 bg-white border border-gray-300 "
                        defaultValue={data.status}
                        onChange={handleChange}
                      >
                        {Object.entries(STATUS_TRANSLATIONS).map(
                          ([key, value]) => (
                            <option value={key} key={key}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <NotesPanel notes={data.notes} />
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
