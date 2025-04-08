import PropTypes from "prop-types";
import TaskItem from "./TaskItem";

const TaskGrid = ({ projectId, tasks, canEdit, onSubmit }) => {

  const handleTaskSubmit = (taskId, updatedTask) => {
    onSubmit({ [taskId]: updatedTask });
  };

  return (
    <div className="p-6 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-primary mb-4">Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            projectId={projectId} // Pass projectId to TaskItem
            task={task}
            canEdit={canEdit}
            onSubmit={(updatedTask) => handleTaskSubmit(task.id, updatedTask)}
          />
        ))}
      </div>
    </div>
  );
};

TaskGrid.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        due_date: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  canEdit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TaskGrid;
