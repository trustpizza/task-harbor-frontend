import { useState } from "react";
import Column from "./Column";
import PropTypes from 'prop-types';

const Board = ({ boardData }) => {
  const [cards, setCards] = useState(boardData || []); // Use boardData or empty array

  return (
    <main className="w-full flex-1 sm:pb-4 overflow-hidden">
      <div className="w-full h-full py-6 sm:py-12 px-6 md:px-0 max-w-7xl mx-auto flex gap-4 overflow-x-scroll">
        <Column title="Scheduled" bgColor="gray" column="scheduled" cards={cards} setCards={setCards} />
        <Column title="To-Do" bgColor="blue" column="todo" cards={cards} setCards={setCards} />
        <Column title="Doing" bgColor="pink" column="doing" cards={cards} setCards={setCards} />
        <Column title="Done" bgColor="green" column="done" cards={cards} setCards={setCards} />
      </div>
    </main>
  );
};

Board.propTypes = {
  boardData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
  })),
};

export default Board;