import { useParams, Outlet } from "react-router-dom";
import { useProject } from "../../../../services/Projects";
import { useState } from "react";
import PageLayout from "../../../../Layouts/ProjectPageLayout";
import Board from "../../../../components/kanban/Board";
import LoadingIndicator from "../../../../components/Shared/LoadingIndicator";
import ProjectDescription from "../../../../components/ProjectManagement/ProjectDescription";
import ProjectFields from "../../../../components/ProjectManagement/ProjectFields";
import TaskGrid from "../../../../components/TaskManagement/TaskGrid";

const ProjectDetail = () => {
  const { projectid } = useParams();
  const { project, error, loading } = useProject({ projectid });

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  if (!project || !project.data) {
    return <p>Error: Project data is unavailable.</p>;
  }

  const project_attrs = project.data.attributes || {};
  const included = project.included || [];
  const field_defs = included.filter(item => item.type === "field_definition");
  const fields = included.filter(item => item.type === "field");
  const tasks = included.filter(item => item.type === "task");


  const handleDescriptionSubmit = (updatedData) => {
    console.log("Updated project details:", updatedData);
    // Add API logic here to update the project details
  };

  const handleFieldsSubmit = (updatedFields) => {
    console.log("Updated fields:", updatedFields);
    // Add API logic here to update the fields
  };

  const handleTaskSubmit = (updateTasks) => {
    console.log("Updated tasks:", updateTasks);
    // Add API logic here to update the tasks
  }

  return (
    <>
      <PageLayout title={project_attrs.name || "Untitled Project"}>
        <div className="flex flex-col items-center w-full gap-2 mb-4">
          <div className="w-full max-w-3xl">
            <ProjectDescription
              description={project_attrs.description || "No description available"}
              projectManager={project_attrs.project_manager || "Unknown"}
              dueDate={project_attrs.due_date || new Date().toISOString()}
              isEditable={true} // Change to false to disable editing
              onSubmit={handleDescriptionSubmit}
            />
          </div>

          <div className="w-full max-w-3xl">
            <ProjectFields
              fieldDefinitions={field_defs}
              fields={fields}
              canEdit={true} // Change to false to disable editing
              onSubmit={handleFieldsSubmit}
            />
          </div>

          <div className="w-full max-w-3xl">
            <TaskGrid 
              projectId={projectid}
              tasks={tasks}
              canEdit={true}
              onSubmit={handleTaskSubmit} 
            />
          </div>
        </div>
        <Outlet />
      </PageLayout>
    </>
  );
};

export default ProjectDetail;
