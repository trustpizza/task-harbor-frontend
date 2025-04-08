// routes.jsx
import Error404 from "../pages/General/Errors/404";
import ProjectIndex from "../pages/ProjectManagement/User/Projects/ProjectIndex";
import About from "../pages/General/About";
import ProjectDetail from "../pages/ProjectManagement/User/Projects/ProjectDetail";
import Login from "../pages/Auth/Login";
import TaskDetail from "../pages/ProjectManagement/User/Tasks/TaskDetail";
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
    children: [
      {
        path: "tasks/:taskId", // Nested route for TaskDetail
        element: (
          <ProtectedRoute>
            <TaskDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];

export default routes;