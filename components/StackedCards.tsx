import React, { useState } from "react";

const Card = ({ title, content, onClick, expanded }) => {
  return (
    <div
      className={`relative p-4 bg-white shadow-lg rounded-lg cursor-pointer 
        ${expanded ? "card-stack-expanded" : "card-stack"}`}
      onClick={onClick}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      {expanded && <p className="mt-2">{content}</p>}
    </div>
  );
};

const StackedCards = ({ cards }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleClick = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
  };

  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          content={card.content}
          onClick={() => handleClick(index)}
          expanded={expandedCard === index}
        />
      ))}
    </div>
  );
};

export default StackedCards;
