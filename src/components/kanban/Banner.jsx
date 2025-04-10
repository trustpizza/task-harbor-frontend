import React from 'react';
import PropTypes from 'prop-types';

const Banner = ({ buttons }) => {
  return (
    <div className="flex justify-end mb-4 p-4 rounded shadow">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`btn ${button.className || 'btn-primary'} mr-2`}
          onClick={button.onClick}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

Banner.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      className: PropTypes.string,
    })
  ).isRequired,
};

export default Banner;