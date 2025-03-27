import { useState } from "react";
import PropTypes from 'prop-types';

const NewCardForm = ({ newCardTitle, onChange, onSubmit, onBlur, autoFocus = true, spellCheck = false }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        name="card-title"
        placeholder="Enter a card title"
        type="text"
        value={newCardTitle}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        spellCheck={spellCheck}
        className="w-full py-2.5 px-3 ring-1 ring-inset sm:text-sm transition outline-none rounded-md focus:ring-primary bg-base-200 text-base-content border border-base-300"
      />
    </form>
  );
};

NewCardForm.propTypes = {
  newCardTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  spellCheck: PropTypes.bool,
};

export default NewCardForm;