import { useParams } from "react-router-dom";
import { useProject } from "../../../services/Projects";
import LoadingIndicator from "../../../components/Shared/LoadingIndicator";

const ProjectDetail = () => {
  const { projectid } = useParams();
  const { project, error, loading } = useProject({ projectid });

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div key={project.id}>
      <h1>{project.name}</h1>
    </div>
    </>
  );
}

export default ProjectDetail;
