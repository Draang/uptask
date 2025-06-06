import type { Task } from "@/types/index";
import TaskCard from "./TaskCard";
import { STATUS_TRANSLATIONS, STATUS_TRANSLATIONS_COLORS } from "@/locals/es";

type TaskListProps = {
  tasks: Task[];
  canEdit: boolean;
};
type GroupTask = {
  [k: string]: Task[];
};

const INITIAL_STATUS_GROUPS: GroupTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  inReview: [],
  completed: [],
};
export default function TaskList({ tasks, canEdit }: TaskListProps) {
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
          <div
            key={status}
            className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5 bg-slate-200"
          >
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
                tasks.map((task) => <TaskCard key={task._id} task={task} canEdit={canEdit}/>)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
