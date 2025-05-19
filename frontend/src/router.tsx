import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/views/Dashboard";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} index />
          <Route path="/proyects/new" element={<CreateProjectView />} />
          <Route
            path="/proyects/:projectId/edit"
            element={<EditProjectView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
