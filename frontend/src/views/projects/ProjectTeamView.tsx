import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  return (
    <>
      <h1 className="text-5xl font-black">Administra el equipo</h1>
      <p className="text-2xl font-light mt-5 text-gray-500">
        Administra el equipo de trabajo
      </p>
      <nav className="my-5 flex gap-3">
        <button
          type="button"
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white cursor-pointer font-bold transition-colors"
          onClick={() => navigate(location.pathname + "?addMember=true")}
        >
          Agregar Colaborador
        </button>
        <Link
          to={`/proyects/${projectId}`}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white cursor-pointer font-bold transition-colors"
        >
          Volver al proyecto
        </Link>
      </nav>
      <AddMemberModal />
    </>
  );
}
