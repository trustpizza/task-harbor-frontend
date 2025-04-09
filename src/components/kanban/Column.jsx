import { useState } from "react";
import clearIndicators from "../helpers/clearIndicators"
import getDropIndicators from "../helpers/getDropIndicators";
import getNearestDropIndicator from "../helpers/getNearestDropIndicator";
import highlightDropIndicators from "../helpers/highlightDropIndicators";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import Button from "../common/Button";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import bgColors from "../helpers/colors";

const Column = ({ title, bgColor, columnTitle, columnId, cards, setCards }) => {
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const draggedCardId = e.dataTransfer.getData("cardId");
    clearIndicators(columnTitle);

    const dropIndicators = getDropIndicators(columnTitle);
    const element = getNearestDropIndicator(e, dropIndicators);

    const beforeCardId = element.dataset.before;

    if (beforeCardId === draggedCardId) return;

    const cardsCopy = [...cards];
    const newCards = cardsCopy.filter((card) => card.id !== draggedCardId);
    const draggedCard = cardsCopy.find((card) => card.id === draggedCardId);
    if (draggedCard) {
      draggedCard.columnTitle = columnTitle;
    }

    const pushToEnd = beforeCardId === "-1";

    if (pushToEnd) {
      newCards.push(draggedCard);
    } else {
      const index = newCards.findIndex((card) => card.id === beforeCardId);
      newCards.splice(index, 0, draggedCard);
    }

    setCards(newCards);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    clearIndicators(columnTitle);
    highlightDropIndicators(e, columnTitle);
  };

  const handleDragLeave = () => {
    clearIndicators(columnTitle);
  };

  const bgColorClass = bgColor ? bgColors[bgColor] : bgColors["base"];
  const filteredCards = cards.filter((card) => card.field_definition_id === columnId);

  return (
    <div className="card bg-base-100 dark:bg-base-200 shadow-md">
      <div className={`card-header bg-${bgColorClass} text-white`}>
        <h2 className="text-xs uppercase tracking-wide font-medium">{title}</h2>
        <span className="font-medium text-xs">({filteredCards.length})</span>
      </div>
      <div className="card-body p-3 overflow-y-auto">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.value}
            columnId={card.field_definition_id}
            handleDragStart={handleDragStart}
            cards={cards}
            setCards={setCards}
          />
        ))}
        <DropIndicator beforeId={-1} columnTitle={columnTitle} />
      </div>
    </div>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
  bgColor: PropTypes.oneOf(["gray", "pink", "green", "blue"]).isRequired,
  columnTitle: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired, // Consider adding more specific shape validation
  setCards: PropTypes.func.isRequired,
};

export default Column;