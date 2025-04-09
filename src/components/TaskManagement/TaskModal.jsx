import PropTypes from "prop-types";
import { useTask } from "../../services/Task";
import LoadingIndicator from "../../components/Shared/LoadingIndicator";
import { Link } from "react-router-dom";

const TaskModal = ({ taskableId, taskId, taskableType, onClose }) => {
  const { task, error, loading } = useTask({ taskableId, taskId, taskableType });

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
          className="btn btn-sm btn-circle btn-error absolute right-2 top-2"
        >
          ✕
        </button>
        <div>
          <h3 className="font-bold text-lg text-primary">{taskData.name}</h3>
          <p className="py-4 text-secondary">{taskData.description}</p>
          <p className="text-sm text-accent">
            Due Date: {new Date(taskData.due_date).toLocaleDateString()}
          </p>
          <div className="mt-4">
            <Link
              to={{
                pathname: `/${taskableType}/${taskableId}/tasks/${taskId}`,
              }}
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
  taskableId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskModal;
