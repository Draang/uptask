import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/views/Dashboard";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPsswView from "./views/auth/ForgotPsswView";
import NewPsswView from "./views/auth/NewPsswView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route path="/auth/confirm" element={<ConfirmAccountView />} />
          <Route
            path="/auth/request-new-code"
            element={<RequestNewCodeView />}
          />
          <Route path="/auth/forgot-pssw" element={<ForgotPsswView />} />
          <Route path="/auth/new-pssw" element={<NewPsswView />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} index />
          <Route path="/proyects/new" element={<CreateProjectView />} />
          <Route
            path="/proyects/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route
            path="/proyects/:projectId/details"
            element={<ProjectDetailsView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
