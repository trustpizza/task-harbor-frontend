import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalHeadless from '../modal/ModalHeadless';

const NewColumnModal = ({ isOpen, onClose, onSubmit, fields, projectAttributes }) => {
  const [name, setName] = useState('');
  const [filterType, setFilterType] = useState('Field');
  const [filterKey, setFilterKey] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filterOperator, setFilterOperator] = useState('=');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, filterType, filterOperator, filterKey, filterValue });
    onClose();
  };

  const optionsForFilterKey = filterType === 'Field' ? fields : projectAttributes;
  const optionsForFilterValue = filterType === 'Field'
    ? (fields.find(field => field.name === filterKey)?.values || [])
    : (projectAttributes.find(attr => attr.name === filterKey)?.values || []);

  return (
    <ModalHeadless isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-lg font-bold mb-4">Add New Column</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Filter Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="Field">Field</option>
            <option value="Project Attribute">Project Attribute</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Filter Key</label>
          <select
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>Select a key</option>
            {optionsForFilterKey.map((option) => (
              <option key={option.name} value={option.name}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Filter Value</label>
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>Select a value</option>
            {optionsForFilterValue.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
            <option value="freehand">Freehand</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Filter Operator</label>
          <select
            value={filterOperator}
            onChange={(e) => setFilterOperator(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="=">Equals (=)</option>
            <option value="<">Less Than `{('<')}`</option>
            <option value=">">Greater Than `{('>')}`</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="btn btn-secondary mr-2">Cancel</button>
          <button type="submit" className="btn btn-primary">Add Column</button>
        </div>
      </form>
    </ModalHeadless>
  );
};

NewColumnModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  projectAttributes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default NewColumnModal;