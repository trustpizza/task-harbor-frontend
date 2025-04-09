import { useParams } from "react-router-dom";
import { useTask } from "../../../../services/Tasks";
import PageLayout from "../../../../Layouts/ProjectPageLayout";
import LoadingIndicator from "../../../../components/Shared/LoadingIndicator";
import ProjectFields from "../../../../components/ProjectManagement/ProjectFields";

const TaskDetail = () => {
  const { projectid, workflowid, taskId } = useParams();
  const taskableId = projectid || workflowid;
  const taskableType = projectid ? "projects" : "workflows";
  const { task, error, loading } = useTask({ taskableId, taskId, taskableType, include: "fields,field_definitions" });
  console.log(task);
  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error.message || "An unexpected error occurred."}</p>;

  if (!task) {
    return <p>Error: Task data is unavailable.</p>;
  }

  return (
    <PageLayout title={task.name}>
      <div className="flex flex-col items-center w-full gap-2 mb-4">

        {/* Task Details */}
        <div className="w-full max-w-3xl">
          <div className="p-6 bg-base-100 shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-primary mb-4">Task Details</h2>
            <p className="text-sm text-secondary mb-2">
              <strong>Description:</strong> {task.description}
            </p>
            <p className="text-sm text-secondary mb-2">
              <strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}
            </p>
          </div>
        </div>

        {/* Task Fields */}
        <div className="w-full max-w-3xl">
          <ProjectFields
            title="Task Fields"
            fieldDefinitions={task.fieldDefinitions}
            fields={task.fields}
            canEdit={true}
            onSubmit={(updatedFields) => console.log("Updated fields:", updatedFields)}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default TaskDetail;
