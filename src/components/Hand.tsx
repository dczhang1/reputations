import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { RankedCard } from '../types/game';

interface HandProps {
  cards: RankedCard[];
  selectedCards: RankedCard[];
  onCardClick: (card: RankedCard) => void;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
`;

const CardWrapper = styled.div<{ isSelected: boolean }>`
  transform: ${props => props.isSelected ? 'translateY(-10px)' : 'none'};
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
`;

export const Hand: React.FC<HandProps> = ({ cards, selectedCards, onCardClick }) => {
  return (
    <Container>
      {cards.map(card => {
        const isSelected = selectedCards.some(c => c.id === card.id);
        const rank = selectedCards.find(c => c.id === card.id)?.rank;

        return (
          <CardWrapper
            key={card.id}
            isSelected={isSelected}
            onClick={() => onCardClick(card)}
          >
            <Card
              text={card.text}
              category={card.category}
              rank={rank}
              isSelected={isSelected}
            />
          </CardWrapper>
        );
      })}
    </Container>
  );
}; 