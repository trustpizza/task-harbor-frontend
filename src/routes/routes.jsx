import Error404 from "../pages/General/Errors/404";
import ProjectIndex from "../pages/ProjectManagement/User/ProjectIndex";
import About from "../pages/General/About";
import ProjectDetail from "../pages/ProjectManagement/User/ProjectDetail";

const routes = [
  {
    path: "/",
    element: <About />,
    errorElement: <Error404 /> // This will show when an error occurs on this route
  },
  {
    path: "/projects",
    element: <ProjectIndex />, 
  },
  {
    path: "/projects/:projectid",
    element: <ProjectDetail />
  },
  {
    path: "*", // Catch-all route for unmatched paths
    element: <Error404 />
  }
];

export default routes;
