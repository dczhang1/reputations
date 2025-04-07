import React from 'react';
import { render, screen } from '@testing-library/react';
import { Hand } from '../Hand';

describe('Hand Component', () => {
  const mockCards = [
    { id: 1, name: 'Card 1', description: 'Description 1', rank: 1 },
    { id: 2, name: 'Card 2', description: 'Description 2', rank: 2 },
    { id: 3, name: 'Card 3', description: 'Description 3', rank: 3 }
  ];

  it('renders all cards in hand', () => {
    render(<Hand cards={mockCards} onCardClick={() => {}} />);
    
    mockCards.forEach(card => {
      expect(screen.getByText(card.name)).toBeInTheDocument();
      expect(screen.getByText(card.description)).toBeInTheDocument();
    });
  });

  it('displays message when no cards are present', () => {
    render(<Hand cards={[]} onCardClick={() => {}} />);
    expect(screen.getByText('No cards in hand')).toBeInTheDocument();
  });

  it('calls onCardClick when a card is clicked', () => {
    const handleClick = jest.fn();
    render(<Hand cards={mockCards} onCardClick={handleClick} />);
    
    screen.getByText('Card 1').click();
    expect(handleClick).toHaveBeenCalledWith(mockCards[0]);
  });
}); 