import { useParams } from "react-router-dom";
import { useProject } from "../../../services/Projects";
import LoadingIndicator from "../../../components/Shared/LoadingIndicator";
import PageLayout from "../../../Layouts/ProjectPageLayout";
import Board from "../../../components/kanban/Board";
import { useState } from "react";

const ProjectDetail = () => {
  const { projectid } = useParams();
  const { project, error, loading } = useProject({ projectid });
  const [viewType, setViewType] = useState("kanban");

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <PageLayout title={project.name}>
      <Board columns={project.field_definitions} values={project.field_values}/>
    </PageLayout>
    </>
  );
}

export default ProjectDetail;
