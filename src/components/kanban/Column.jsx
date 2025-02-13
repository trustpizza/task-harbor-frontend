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
import NewCardForm from "./newCardForm";

const Column = ({ title, bgColor, columnTitle, columnId, cards, setCards }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = form.get("card-title");

    const newCard = {
      id: Date.now().toString(),
      title,
      columnTitle,
    };

    setCards([...cards, newCard]);
    setIsAddingCard(false);

    e.currentTarget.reset();
  };

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
    <div className="rounded-xl overflow-hidden flex flex-col w-full h-min max-h-full max-w-[21.5rem] shrink-0 bg-base-100 shadow-md">
      <div className={`bg-${bgColorClass} w-full flex items-baseline justify-between px-4 py-[1.10rem] text-white`}>
          <h2 className="text-xs uppercase tracking-wide font-medium">{title}</h2>
          <span className="font-medium text-xs">({filteredCards.length})</span>
      </div>
      <motion.div layout className="flex-grow">
          <motion.div
              layout
              onDrop={handleDragEnd}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              className="p-3 overflow-y-auto h-full overflow-x-hidden"
          >
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
              <motion.div layout className="py-1">
                  {isAddingCard? (
                      <form onSubmit={handleSubmission}>
                          <input
                              name="card-title"
                              placeholder="Enter a card title"
                              type="text"
                              value={newCardTitle}
                              onChange={(e) => setNewCardTitle(e.target.value)}
                              onBlur={() => setIsAddingCard(false)}
                              autoFocus={true}
                              spellCheck={false}
                              className="w-full py-2.5 px-3 ring-1 ring-inset sm:text-sm transition outline-none rounded-md focus:ring-primary bg-base-200 text-base-content border border-base-300"
                          />
                      </form>
                  ): (
                      <Button onClick={() => setIsAddingCard(true)} variant="secondaryV2" className="w-full">
                          Add a card
                      </Button>
                  )}
              </motion.div>
          </motion.div>
      </motion.div>
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