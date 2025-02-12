const getDropIndicators = (column) => {
  return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
};

export default getDropIndicators;