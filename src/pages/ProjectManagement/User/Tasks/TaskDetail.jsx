import { useParams } from "react-router-dom";
import { useTask } from "../../../../services/Task";
import PageLayout from "../../../../Layouts/ProjectPageLayout";
import LoadingIndicator from "../../../../components/Shared/LoadingIndicator";
import ProjectFields from "../../../../components/ProjectManagement/ProjectFields";

const TaskDetail = () => {
  const { projectId, taskId } = useParams();
  const { task, error, loading } = useTask({ projectId, taskId });

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  if (!task || !task.data) {
    return <p>Error: Task data is unavailable.</p>;
  }

  const taskAttrs = task.data.attributes || {};
  const included = task.included || [];
  const fieldDefs = included.filter((item) => item.type === "field_definition");
  const fields = included.filter((item) => item.type === "field");

  const handleFieldsSubmit = (updatedFields) => {
    console.log("Updated fields:", updatedFields);
    // Add API logic here to update the fields
  };

  return (
    <PageLayout title={taskAttrs.name || "Untitled Task"}>
      <div className="flex flex-col items-center w-full gap-2 mb-4">
        <div className="w-full max-w-3xl">
          <div className="p-6 bg-base-100 shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-primary mb-4">Task Details</h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Description:</strong> {taskAttrs.description || "No description available"}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Due Date:</strong> {new Date(taskAttrs.due_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="w-full max-w-3xl">
          <ProjectFields
            fieldDefinitions={fieldDefs}
            fields={fields}
            canEdit={true} // Change to false to disable editing
            onSubmit={handleFieldsSubmit}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default TaskDetail;
