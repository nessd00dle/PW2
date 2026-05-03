import React from 'react';
import Card from './Card';

const CardGrid = ({ cards, onCardClick }) => {
  if (!cards || cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <p className="text-gray-400 text-sm sm:text-base">No hay cartas para mostrar</p>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">Prueba ajustando los filtros</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* contador de resultados */}
      <div className="text-[10px] sm:text-xs text-gray-400 px-1">
        Mostrando {cards.length} {cards.length === 1 ? 'carta' : 'cartas'}
      </div>
      
      {/* grid resposivo*/}
      <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {cards.map(card => (
          <Card key={card.id} card={card} onClick={onCardClick} />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;