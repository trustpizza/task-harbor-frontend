import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalHeadless from '../modal/ModalHeadless';
import TextField from './FormComponents/TextField';
import SelectField from './FormComponents/SelectField';

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

  const optionsForFilterKey = (filterType === 'Field' ? fields : projectAttributes || []).map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const optionsForFilterValue = (filterType === 'Field'
    ? fields.find(f => f.name === filterKey)
    : projectAttributes.find(a => a.name === filterKey)
  )?.values?.map((val) => ({ value: val, label: val })) || [];

  const filterTypeOptions = [
    { value: 'Project Attribute', label: 'Project Attribute' },
    { value: 'Field', label: 'Field' },
  ];

  const operatorOptions = [
    { value: '=', label: 'Equals (=)' },
    { value: '<', label: 'Less Than (<)' },
    { value: '>', label: 'Greater Than (>)' },
  ];

  return (
    <ModalHeadless isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-4">
        <h2 className="text-lg font-bold mb-4">Add New Column</h2>

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <SelectField
          label="Filter Type"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setFilterKey('');
            setFilterValue('');
          }}
          options={filterTypeOptions}
        />

        <SelectField
          label="Filter Key"
          value={filterKey}
          onChange={(e) => {
            setFilterKey(e.target.value);
            setFilterValue('');
          }}
          options={optionsForFilterKey}
          placeholder="Select a key"
        />

        <SelectField
          label="Filter Value"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          options={[...optionsForFilterValue, { value: 'freehand', label: 'Freehand' }]}
          placeholder="Select a value"
          disabled={!filterKey}
        />

        <SelectField
          label="Filter Operator"
          value={filterOperator}
          onChange={(e) => setFilterOperator(e.target.value)}
          options={operatorOptions}
        />

        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="btn btn-secondary mr-2">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Column
          </button>
        </div>
      </form>
    </ModalHeadless>
  );
};

NewColumnModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  projectAttributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default NewColumnModal;