import PropTypes from 'prop-types';

const TextField = ({ label, value, onChange, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="input input-bordered w-full text-primary"
      required={required}
    />
  </div>
);

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default TextField;