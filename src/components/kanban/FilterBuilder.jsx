import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FilterBuilder = ({ fields, onFilterCreated }) => {
  const [conditions, setConditions] = useState([]);

  const addCondition = () => {
    setConditions([...conditions, { type: 'field', field_definition_id: '', operator: 'eq', value: '' }]);
  };

  const updateCondition = (index, updatedCondition) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], ...updatedCondition };
    setConditions(newConditions);
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-lg font-bold mb-4">Build Filter</h2>

      {conditions.map((condition, index) => (
        <div key={index} className="mb-4 border p-4 rounded">
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Field</label>
            <select
              value={condition.field_definition_id}
              onChange={(e) => updateCondition(index, { field_definition_id: e.target.value })}
              className="select select-bordered w-full"
            >
              <option value="">Select a field</option>
              {fields.map((field) => (
                <option key={field.id} value={field.id}>{field.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Operator</label>
            <select
              value={condition.operator}
              onChange={(e) => updateCondition(index, { operator: e.target.value })}
              className="select select-bordered w-full"
            >
              <option value="eq">Equals</option>
              <option value="neq">Not Equals</option>
              <option value="lt">Less Than</option>
              <option value="gt">Greater Than</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Value</label>
            <input
              type="text"
              value={condition.value}
              onChange={(e) => updateCondition(index, { value: e.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="button"
            onClick={() => removeCondition(index)}
            className="btn btn-error btn-sm mt-2"
          >
            Remove Condition
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addCondition}
        className="btn btn-secondary mb-4"
      >
        Add Condition
      </button>

      <button type="submit" className="btn btn-primary">
        Create Filter
      </button>
    </form>
  );
};

FilterBuilder.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilterCreated: PropTypes.func.isRequired,
};

export default FilterBuilder;