import React from 'react';
import PropTypes from 'prop-types';

const Banner = ({ onOpenModal }) => {
  return (
    <div className="flex justify-end mb-4 p-4 rounded shadow">
      <button
        className="btn btn-primary"
        onClick={onOpenModal}
      >
        Add Column
      </button>
    </div>
  );
};

Banner.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};

export default Banner;