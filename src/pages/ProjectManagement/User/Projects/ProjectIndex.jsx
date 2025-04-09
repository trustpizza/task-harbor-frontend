import { useProjects } from "../../../../services/Projects";
import LoadingIndicator from "../../../../components/Shared/LoadingIndicator";
import PageLayout from "../../../../Layouts/ProjectPageLayout";
import Board from "../../../../components/kanban/Board";

const ProjectIndex = () => {
  const { projects, error, loading } = useProjects();

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  // Placeholder logic for sorting projects into columns
  const columns = [
    { id: "overdue", name: "Overdue", bgColor: "red" },
    { id: "on-track", name: "On Track", bgColor: "green" },
    { id: "upcoming", name: "Upcoming", bgColor: "blue" },
  ];

  const values = projects.data.map((project) => ({
    id: project.id,
    value: project.attributes.name,
    field_definition_id: "on-track", // Placeholder: Assign all to "On Track" for now
  }));

  return (
    <PageLayout title="Projects">
      <Board columns={columns} values={values} />
    </PageLayout>
  );
};

export default ProjectIndex;