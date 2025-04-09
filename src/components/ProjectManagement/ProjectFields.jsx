import PropTypes from "prop-types";
import ProjectField from "./ProjectField";
import { useState } from "react";
import EditButton from "../buttons/EditButton";

const ProjectFields = ({ title, fieldDefinitions, fields, canEdit, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});

  const handleFieldChange = (fieldId, newValue) => {
    setEditedFields((prev) => ({ ...prev, [fieldId]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedFields);
    setIsEditing(false); // Exit edit mode after submission
  };

  return (
    <div className="p-6 bg-base-100 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        {canEdit && (
          <EditButton
            isEditing={isEditing}
            onClick={() => setIsEditing((prev) => !prev)}
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fieldDefinitions.map((fieldDef) => {
            const relatedFields = fields.filter(
              (field) => field.relationships.field_definition.data.id === fieldDef.id
            );

            return (
              <ProjectField
                key={fieldDef.id}
                fieldDefinition={fieldDef}
                fields={relatedFields}
                canEdit={isEditing}
                onFieldChange={handleFieldChange}
              />
            );
          })}
        </div>
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

ProjectFields.propTypes = {
  fieldDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        field_type: PropTypes.string.isRequired,
        options: PropTypes.any,
        required: PropTypes.bool.isRequired,
      }).isRequired,
    })
  ).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      attributes: PropTypes.shape({
        fieldable_type: PropTypes.string.isRequired,
        fieldable_id: PropTypes.number.isRequired,
        value: PropTypes.any.isRequired,
      }).isRequired,
    })
  ).isRequired,
  canEdit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProjectFields;
