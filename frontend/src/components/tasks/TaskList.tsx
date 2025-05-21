import type { Task } from "@/types/index";
import TaskCard from "./TaskCard";


type TaskListProps = {
  tasks: Task[];
};
type GroupTask = {
  [k: string]: Task[];
};
type GroupTaskTranslation = {
  [k: string]: string;
};
const STATUS_TRANSLATIONS: GroupTaskTranslation = {
  pending: "Pendiente",
  onHold: "En Espera",
  inProgress: "En Progreso",
  inReview: "En Revision",
  completed: "Completada",
};
const STATUS_TRANSLATIONS_COLORS: GroupTaskTranslation = {
  pending: "border-t-yellow-500",
  onHold: "border-t-violet-500",
  inProgress: "border-t-cyan-500",
  inReview: "border-t-orange-500",
  completed: "border-t-lime-500",
};
const INITIAL_STATUS_GROUPS: GroupTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  inReview: [],
  completed: [],
};
export default function TaskList({ tasks }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, INITIAL_STATUS_GROUPS);

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5 bg-slate-200">
            <h3
              className={`capitalize text-xl border border-slate-300 bg-white p-3 border-t-8 ${STATUS_TRANSLATIONS_COLORS[status]}`}
            >
              {STATUS_TRANSLATIONS[status]}
            </h3>
            <ul className="mt-2 space-y-2 p-1">
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
