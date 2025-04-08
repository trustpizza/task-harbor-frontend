import PropTypes from "prop-types";
import { useTask } from "../../services/Task";
import LoadingIndicator from "../../components/Shared/LoadingIndicator";
import { Link } from "react-router-dom";

const TaskModal = ({ projectId, taskId, onClose }) => {
  const { task, error, loading } = useTask({ projectId, taskId });

  if (loading) return <LoadingIndicator />;
  if (error) return <p>Error: {error}</p>;

  if (!task || !task.data) {
    return <p>Error: Task data is unavailable.</p>;
  }

  const taskData = task.data.attributes || {};

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <div>
          <h3 className="font-bold text-lg">{taskData.name}</h3>
          <p className="py-4">{taskData.description}</p>
          <p className="text-sm text-gray-500">
            Due Date: {new Date(taskData.due_date).toLocaleDateString()}
          </p>
          <div className="mt-4">
            <Link
              to={`/projects/${projectId}/tasks/${taskId}`} // Link to TaskDetail
              className="btn btn-primary"
            > 
              Open Full Task
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskModal;
