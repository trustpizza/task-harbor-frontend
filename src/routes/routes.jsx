// routes.jsx
import Error404 from "../pages/General/Errors/404";
import ProjectIndex from "../pages/ProjectManagement/User/ProjectIndex";
import About from "../pages/General/About";
import ProjectDetail from "../pages/ProjectManagement/User/ProjectDetail";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <About />,
    errorElement: <Error404 />,
  },
  {
    path: "/projects",
    element: (
      <ProtectedRoute>
        <ProjectIndex />
      </ProtectedRoute>
    ),
  },
  {
    path: "/projects/:projectid",
    element: (
      <ProtectedRoute>
        <ProjectDetail />
      </ProtectedRoute>
    ),
  },
    {
        path: "/login",
        element: <Login />
    },
  {
    path: "*",
    element: <Error404 />,
  },
];

export default routes;