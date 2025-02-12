import PropTypes from 'prop-types';

const DropIndicator = ({ beforeId, column }) => {
  return <div data-before={beforeId} data-column={column} className="w-full h-[0.25rem] bg-indigo-500 opacity-0" />;
};

DropIndicator.propTypes = {
  beforeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  column: PropTypes.string.isRequired,
};

export default DropIndicator;