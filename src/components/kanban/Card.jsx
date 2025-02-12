import { BadgePlus } from "lucide-react";
import IconButton from "../common/IconButton";
import DropIndicator from "./DropIndicator";
import { motion } from "framer-motion";
import { useState } from "react";
import EditCard from "./EditCard";
import PropTypes from 'prop-types';

const Card = ({ id, title, column, handleDragStart, cards, setCards }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing && (
        <EditCard isEditing={isEditing} cards={cards} setCards={setCards} setIsEditing={setIsEditing} card={{ id, title, column }} />
      )}
      <DropIndicator beforeId={id} column={column} />
      <div onDragStart={(e) => handleDragStart(e, { id, title, column })} draggable>
        <motion.div
          layout
          layoutId={id}
          className="w-full cursor-grabbing flex items-center justify-between gap-4 py-2.5 pl-3 pr-2 bg-white dark:bg-zinc-800 shadow-sm rounded-lg border border-zinc-100 dark:border-zinc-700/50"
        >
          <h3 className="text-sm font- line-clamp-2 text-zinc-900 dark:text-zinc-200">{title}</h3>
          <IconButton
            onClick={() => {
              setIsEditing(true);
            }}
            title="Edit card"
          >
            <BadgePlus size={18} strokeWidth={1.75} className="text-zinc-400 dark:text-zinc-500" />
          </IconButton>
        </motion.div>
      </div>
    </>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  setCards: PropTypes.func.isRequired,
};


export default Card;