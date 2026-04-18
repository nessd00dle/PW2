import React from 'react';
import Card from './Card';

const CardGrid = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(card => (
        <Card key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default CardGrid;
