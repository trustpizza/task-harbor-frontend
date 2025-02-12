import clearIndicators from "./clearIndicators";
import getDropIndicators from "./getDropIndicators";
import getNearestDropIndicator from "./getNearestDropIndicator";

const highlightDropIndicators = (e, column) => {
  const dropIndicators = getDropIndicators(column);

  clearIndicators(column);
  const element = getNearestDropIndicator(e, dropIndicators);

  if (element) {
    element.style.opacity = "1"; // No type assertion needed
  }
};

export default highlightDropIndicators;