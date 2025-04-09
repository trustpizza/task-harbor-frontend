import React, { useState } from 'react';
import Column from "./Column";
import Banner from "./Banner";
import NewColumnModal from "./NewColumnModal";
import PropTypes from 'prop-types';

const Board = ({ columns, values, fields, projectAttributes, onAddColumn, onDeleteColumn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="w-full flex-1 sm:pb-4 overflow-hidden">
      {/* Banner Element */}
      <Banner onOpenModal={() => setIsModalOpen(true)} />

      <div className="w-full h-full py-6 sm:py-12 px-6 md:px-0 mx-auto overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-[minmax(300px,_1fr)] gap-4">
          {columns.map(column => (
            <div key={column.id} className="flex flex-col">
              <h2 className="text-lg font-bold text-center mb-4">{column.name}</h2>
              <Column
                title={column.name}
                bgColor={column.bgColor}
                columnTitle={column.name}
                columnId={column.id}
                cards={values.filter(value => value.field_definition_id === column.id)}
                setCards={() => {}}
                onDeleteColumn={onDeleteColumn}
              />
            </div>
          ))}
        </div>
      </div>

      {/* New Column Modal */}
      <NewColumnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddColumn}
        fields={fields}
        projectAttributes={projectAttributes}
      />
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
  fields: PropTypes.array.isRequired,
  projectAttributes: PropTypes.object.isRequired,
  onAddColumn: PropTypes.func.isRequired,
};

export default Board;