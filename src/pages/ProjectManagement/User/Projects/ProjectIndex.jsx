import { useState } from "react";
import { useProjects } from "../../../../services/Projects";
import LoadingIndicator from "../../../../components/Shared/LoadingIndicator";
import PageLayout from "../../../../Layouts/ProjectPageLayout";
import Board from "../../../../components/kanban/Board";
import ColumnManager from "../../../../components/kanban/ColumnManager";
import NewColumnModal from "../../../../components/kanban/NewColumnModal";
import NewFilterModal from "../../../../components/kanban/FilterModal";

const ProjectIndex = () => {
  const { projects, error, loading } = useProjects({ include: "all" });
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  const bannerButtons = [
    { label: "Add Column", onClick: () => setIsAddColumnModalOpen(true) },
    { label: "Filter", onClick: () => setIsFilterModalOpen(true) },
  ]

  return (
    <>
      <PageLayout title="Projects">
        <ColumnManager objects={projects} objectLocalStorageKey="columns">
          {({ columns, values, addColumn, deleteColumn }) => (
            <Board
            columns={columns}
            values={values}
            bannerButtons={bannerButtons}
            fields={[]} // Placeholder for fields
            onAddColumn={addColumn}
            onDeleteColumn={deleteColumn}
            />
          )}
        </ColumnManager>

        <NewColumnModal
          isOpen={isAddColumnModalOpen}
          onClose={() => setIsAddColumnModalOpen(false)}
          onSubmit={(newColumn) => console.log("New column added:", newColumn)}
          fields={[]}
          projectAttributes={[]}
        />

        <NewFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filters={[]}
          onFilterSelect={(selectedFilter) => console.log("Selected filter:", selectedFilter)}
          onCreateFilter={(newFilter) => console.log("New filter created:", newFilter)}
        />
        

        {/* Placeholder for the other modal */}
        {/* {isFilterModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="btn btn-sm btn-circle btn-error absolute right-2 top-2"
              >
                ✕
              </button>
              <p>Other modal content goes here...</p>
            </div>
          </div>
        )} */}
      </PageLayout>
    </>
  );
};

export default ProjectIndex;