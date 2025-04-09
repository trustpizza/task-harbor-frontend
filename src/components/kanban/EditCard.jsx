import { X } from "lucide-react";
import IconButton from "../common/IconButton";
import ModalHeadless from "../modal/ModalHeadless";
import SelectInput from "../common/SelectInput";
import Button from "../common/Button";
import PropTypes from 'prop-types';

const EditCard = ({ isEditing, setIsEditing, card, cards, setCards }) => {
  const handleChangeTitle = (title) => {
    if (!title) return;
    const updatedCard = { ...card, title };
    const updatedCards = cards.map((card) => (card.id === updatedCard.id ? updatedCard : card));
    setCards(updatedCards);
  };

  const handleMoveCard = (column) => {
    const updatedCard = { ...card, column };
    const updatedCards = cards.map((card) => (card.id === updatedCard.id ? updatedCard : card));
    setCards(updatedCards);
  };

  const handleDeleteCard = () => {
    const updatedCards = cards.filter((c) => c.id !== card.id);
    setCards(updatedCards);
    setIsEditing(false);
  };

  return (
    <ModalHeadless isOpen={isEditing} onOverlayClick={() => setIsEditing(false)}>
      <CardHeader setIsEditing={setIsEditing} />
      <CardBody card={card} onTitleChange={handleChangeTitle} onDelete={handleDeleteCard} onCardMove={handleMoveCard} />
    </ModalHeadless>
  );
};

const CardBody = ({ card, onTitleChange, onCardMove, onDelete }) => {
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <div>
        <label htmlFor="card-title" className="sr-only">
          Card title
        </label>
        <textarea
          onBlur={(e) => onTitleChange(e.target.value)}
          id="card-title"
          className="w-full h-20 min-h-20 transition p-2.5 outline-none focus:ring-2 focus:ring-inset focus:ring-primary bg-transparent sm:text-sm text-base-content dark:text-neutral-content resize-none border border-base-300 dark:border-neutral-700 rounded-md"
        >
          {card.title}
        </textarea>
      </div>
      <span className="border-b py-1 border-dashed border-base-300 dark:border-neutral-700/50" />
    </div>
  );
};

const CardHeader = ({ setIsEditing }) => {
  return (
    <div className="w-full px-4 pr-2 py-2 border-b border-base-200 dark:border-neutral-800 flex justify-between items-center">
      <h3 className="text-base-content dark:text-neutral-200 text-sm">Edit a card</h3>
      <IconButton onClick={() => setIsEditing(false)} title="Close">
        <X size={18} strokeWidth={1.75} />
      </IconButton>
    </div>
  );
};


EditCard.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  card: PropTypes.shape({  // Define the shape of the card object
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
  }).isRequired,
  cards: PropTypes.array.isRequired,  // Be more specific if possible: PropTypes.arrayOf(PropTypes.shape({ ... }))
  setCards: PropTypes.func.isRequired,
};

CardHeader.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
};

CardBody.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
  }).isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onCardMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};


export default EditCard;