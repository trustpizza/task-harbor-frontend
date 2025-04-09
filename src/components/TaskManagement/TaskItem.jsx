import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskModal from "./TaskModal";

const TaskItem = ({ taskableId, taskableType, task, canEdit, onSubmit }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editedTask, setEditedTask] = useState({
    name: task.attributes.name,
    description: task.attributes.description,
    dueDate: new Date(task.attributes.due_date).toISOString().split("T")[0],
  });

  const handleChange = (field, value) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSubmit(editedTask);
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-sm">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-primary">Name</h3>
        {isEditing ? (
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="input input-bordered w-full"
          />
        ) : (
          <p className="text-sm text-secondary">{task.attributes.name}</p>
        )}
      </div>
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-primary">Description</h3>
        {isEditing ? (
          <textarea
            value={editedTask.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        ) : (
          <p className="text-sm text-secondary">{task.attributes.description}</p>
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-primary">Due Date</h3>
        {isEditing ? (
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            className="input input-bordered w-full"
          />
        ) : (
          <p className="text-sm text-secondary">
            {new Date(task.attributes.due_date).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setIsModalOpen(true)} // Open TaskModal
          className="btn btn-outline btn-info"
        >
          View
        </button>
        {canEdit && (
          <div>
            {isEditing ? (
              <button onClick={handleSave} className="btn btn-primary">
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-secondary"
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      {isModalOpen && (
        <TaskModal
          taskableId={taskableId}
          taskableType={taskableType}
          taskId={task.id}
          onClose={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => navigate(`tasks/${task.id}`)}
            className="btn btn-link"
          >
            Go to Task Detail
          </button>
        </TaskModal>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      due_date: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  canEdit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TaskItem;