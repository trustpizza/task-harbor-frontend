const clearIndicators = (column) => {
  const indicators = Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  indicators.forEach((element) => {
    element.style.opacity = "0"; // No need for type assertion in JS
  });
};

export default clearIndicators;