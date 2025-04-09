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

const Column = ({ bgColor, columnTitle, columnId, cards, setCards, onDeleteColumn }) => {
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
    <div className="card bg-base-100 dark:bg-base-200 shadow-md relative">
      <div className={`card-header bg-${bgColorClass} text-white flex justify-between items-center`}>
        <h2 className="text-xs uppercase tracking-wide font-medium">{columnTitle || "Untitled Column"}</h2>
        <button
          className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-xs"
          onClick={() => onDeleteColumn(columnId)}
        >
          X
        </button>
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
  bgColor: PropTypes.oneOf(["gray", "pink", "green", "blue"]).isRequired,
  columnTitle: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  setCards: PropTypes.func.isRequired,
  onDeleteColumn: PropTypes.func.isRequired,
};

export default Column;