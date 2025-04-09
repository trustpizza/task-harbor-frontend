import { BadgePlus } from "lucide-react";
import IconButton from "../common/IconButton";
import DropIndicator from "./DropIndicator";
import { motion } from "framer-motion";
import { useState } from "react";
import EditCard from "./EditCard";
import PropTypes from 'prop-types';

const Card = ({ id, title, columnId, handleDragStart, cards, setCards }) => {
  const [isEditing, setIsEditing] = useState(false);
  const cardValue = String(title);
  return (
    <>
      {isEditing && (
        <EditCard
          isEditing={isEditing}
          cards={cards}
          setCards={setCards}
          setIsEditing={setIsEditing}
          card={{ id, title, columnId }}
        />
      )}
      <DropIndicator beforeId={id} columnId={columnId} />
      <div onDragStart={(e) => handleDragStart(e, { id, title, columnId })} draggable>
        <motion.div
          layout
          layoutId={id}
          className="w-full cursor-grab flex items-center justify-between gap-4 py-2 pl-3 pr-2 bg-base-100 shadow-sm rounded-lg border border-base-300 hover:bg-base-200 transition-colors duration-200"
        >
          <h3 className="text-sm font-medium line-clamp-2 text-base-content">
            {cardValue}
          </h3>
          <IconButton
            onClick={() => {
              setIsEditing(true);
            }}
            title="Edit card"
          >
          </IconButton>
        </motion.div>
      </div>
    </>
  );
};
Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  setCards: PropTypes.func.isRequired,
};


export default Card;