import Column from "./Column";
import PropTypes from 'prop-types';

const Board = ({ columns, values }) => {

  const handleCardUpdate = (updatedCard) => {
    // This function will need to be passed down from a parent component
    // that manages the overall card data if you want to persist changes.
    // For now, this just updates the local state.  If you're managing
    // card data in a higher component, you'll need to lift the state up.
    console.log("Card updated:", updatedCard); // Placeholder. Implement update logic.
  };

  return (
    <main className="w-full flex-1 sm:pb-4 overflow-hidden"> {/* Remove background color from main */}
      <div className="w-full h-full py-6 sm:py-12 px-6 md:px-0 mx-auto flex justify-center gap-4 overflow-x-scroll">
        {columns.map(column => (
          <Column
            key={column.id}
            title={column.name}
            bgColor={column.bgColor}
            columnTitle={column.name}
            columnId={column.id}
            cards={values.filter(value => value.field_definition_id === column.id)}
            setCards={handleCardUpdate}
          />
        ))}
      </div>
    </main>
  );
};

Board.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
  })).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
  })).isRequired,
};

export default Board;