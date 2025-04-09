import PropTypes from "prop-types";

const ProjectField = ({ fieldDefinition, fields, canEdit, onFieldChange }) => {
  
  const renderFieldValue = (field) => {
    if (canEdit) {
      switch (fieldDefinition.fieldType) {
        case "boolean":
          return (
            <input
              type="checkbox"
              checked={field.value === "true"}
              onChange={(e) => onFieldChange(id, e.target.checked.toString())}
            />
          );
        case "date":
          return (
            <input
              type="date"
              value={new Date(field.value).toISOString().split("T")[0]}
              onChange={(e) => onFieldChange(id, e.target.value)}
              className="input input-bordered"
            />
          );
        case "string":
        default:
          return (
            <input
              type="text"
              value={field.value}
              onChange={(e) => onFieldChange(id, e.target.value)}
              className="input input-bordered"
            />
          );
      }
    }

    // Read-only view
    switch (fieldDefinition.fieldType) {
      case "boolean":
        return <input type="checkbox" checked={field.value === "true"} readOnly />;
      case "date":
        return <p>{new Date(field.value).toLocaleDateString()}</p>;
      case "string":
      default:
        return <p>{field.value}</p>;
    }
  };

  return (
    <div className="p-4 bg-base-200 rounded-lg shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{fieldDefinition.name}</h3>
      {fields.map((field) => (
        <div key={field.id} className="text-sm text-gray-600">
          {renderFieldValue(field)}
        </div>
      ))}
    </div>
  );
};

ProjectField.propTypes = {
  fieldDefinition: PropTypes.shape({
    id: PropTypes.string.isRequired,
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      fieldType: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      attributes: PropTypes.shape({
        value: PropTypes.any.isRequired,
      }).isRequired,
    })
  ).isRequired,
  canEdit: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

export default ProjectField;
