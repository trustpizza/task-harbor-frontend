import { Link, Outlet } from "react-router-dom";
import { useProjects} from "../../../services/Projects";

const ProjectIndex = () => {
  const { projects, error, loading } = useProjects(); // ✅ Call hook properly

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div>
      <h1>Projects</h1>
      {projects.length === 0 ? (
        <p>No projects available</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    <Outlet />
    </>
  );
};

export default ProjectIndex;
