import type { Note } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetails from "./NoteDetails";
import { useLocation, useParams } from "react-router-dom";
type NotesPanelProps = {
  notes: Note[];
};
export default function NotesPanel({ notes }: NotesPanelProps) {
  //Project ID
  const params = useParams();
  const projectId = params.projectId!;
  //TaskID
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;
  return (
    <>
      <AddNoteForm projectId={projectId} taskId={taskId} />
      <div className="divide-y divide-gray-100 mt-10">
        {notes.length ? (
          <>
            <p className="font-bold text-2xl text-slate-600 my-5">Notas:</p>
            {notes.map((note) => (
              <NoteDetails
                note={note}
                key={note._id}
                projectId={projectId}
                taskId={taskId}
              />
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-center pt-3">No hay notas</p>
        )}
      </div>
    </>
  );
}
