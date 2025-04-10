import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalHeadless from '../modal/ModalHeadless';
import FilterBuilder from './FilterBuilder';

const FilterModal = ({ isOpen, onClose, filters, onFilterSelect, onCreateFilter }) => {
  const [isCreatingFilter, setIsCreatingFilter] = useState(false);

  const handleCreateFilter = (newFilter) => {
    onCreateFilter(newFilter);
    setIsCreatingFilter(false);
    onClose();
  };

  return (
    <ModalHeadless isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        {isCreatingFilter ? (
          <FilterBuilder
            fields={[]}
            onFilterCreated={handleCreateFilter}
          />
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4">Select or Create a Filter</h2>
            <ul className="mb-4">
              {filters.map((filter, index) => (
                <li key={index} className="mb-2">
                  <button
                    className="btn btn-secondary w-full"
                    onClick={() => {
                      onFilterSelect(filter);
                      onClose();
                    }}
                  >
                    {filter.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-primary w-full"
              onClick={() => setIsCreatingFilter(true)}
            >
              Create New Filter
            </button>
          </>
        )}
      </div>
    </ModalHeadless>
  );
};

FilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onCreateFilter: PropTypes.func.isRequired,
};

export default FilterModal;