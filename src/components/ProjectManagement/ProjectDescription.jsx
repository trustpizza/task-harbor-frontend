import PropTypes from "prop-types";
import { useState } from "react";
import EditButton from "../buttons/EditButton";

const ProjectDescription = ({ description, projectManager, dueDate, isEditable, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    description,
    projectManager,
    dueDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setIsEditing(false); // Exit edit mode after submission
  };

  if (!isEditable) {
    return (
      <div className="p-6 bg-base-100 shadow-md rounded-lg">
        <h2 className="text-xl font-bold text-primary mb-4">Project Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-500">Description</p>
            <p className="text-sm text-gray-700">{description}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Project Manager</p>
            <p className="text-sm text-gray-700">{projectManager}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Due Date</p>
            <p className="text-sm text-gray-700">{new Date(dueDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary">Project Details</h2>
        {isEditable && (
          <EditButton
            isEditing={isEditing}
            onClick={() => setIsEditing((prev) => !prev)}
          />
        )}
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered"
                placeholder="Enter project description"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Project Manager</span>
              </label>
              <input
                type="text"
                name="projectManager"
                value={formData.projectManager}
                onChange={handleChange}
                className="input input-bordered"
                placeholder="Enter project manager ID"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Due Date</span>
              </label>
              <input
                type="datetime-local"
                name="dueDate"
                value={new Date(formData.dueDate).toISOString().slice(0, 16)}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-500">Description</p>
            <p className="text-sm text-gray-700">{description}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Project Manager</p>
            <p className="text-sm text-gray-700">{projectManager}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500">Due Date</p>
            <p className="text-sm text-gray-700">{new Date(dueDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

ProjectDescription.propTypes = {
  description: PropTypes.string.isRequired,
  projectManager: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProjectDescription;
