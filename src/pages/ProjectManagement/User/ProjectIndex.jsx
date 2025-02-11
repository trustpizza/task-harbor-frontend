import { Link, Outlet } from "react-router-dom";
import { useProjects} from "../../../services/Projects";
import LoadingIndicator from "../../../components/Shared/LoadingIndicator";

const ProjectIndex = () => {
  const { projects, error, loading } = useProjects();

  if (loading) return <LoadingIndicator />;
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
