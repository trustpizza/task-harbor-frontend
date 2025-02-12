// ErrorDisplay.jsx
import React from 'react';

const ErrorDisplay = ({ message = "An unknown error occurred." }) => {
  return (
    <div className="text-red-500 bg-red-100 border border-red-200 rounded p-4 mt-4">
      <p className="font-bold">Error:</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;