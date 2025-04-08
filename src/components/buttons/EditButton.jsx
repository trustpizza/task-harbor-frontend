import PropTypes from "prop-types";

const EditButton = ({ isEditing, onClick }) => {
  return (
    <button
      type="button"
      className={`btn ${isEditing ? "btn-error" : "btn-secondary"}`}
      onClick={onClick}
    >
      {isEditing ? "Cancel" : "Edit"}
    </button>
  );
};

EditButton.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
