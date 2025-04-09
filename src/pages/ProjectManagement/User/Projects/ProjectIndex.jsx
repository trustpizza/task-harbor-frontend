import { useProjects } from "../../../../services/Projects";
import LoadingIndicator from "../../../../components/Shared/LoadingIndicator";
import PageLayout from "../../../../Layouts/ProjectPageLayout";
import Board from "../../../../components/kanban/Board";
import ColumnManager from "../../../../components/kanban/ColumnManager";

const ProjectIndex = () => {
  const { projects, error, loading } = useProjects({ include: "all" });

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  return (
    <PageLayout title="Projects">
      <ColumnManager objects={projects} objectLocalStorageKey="columns">
        {({ columns, values, addColumn, deleteColumn }) => (
          <Board
            columns={columns}
            values={values}
            fields={[]} // Placeholder for fields
            onAddColumn={addColumn}
            onDeleteColumn={deleteColumn}
          />
        )}
      </ColumnManager>
    </PageLayout>
  );
};

export default ProjectIndex;