import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card Component', () => {
  const mockCard = {
    id: 1,
    name: 'Test Card',
    description: 'Test Description',
    rank: 1
  };

  it('renders card with name and description', () => {
    render(<Card {...mockCard} onClick={() => {}} />);
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('displays rank when provided', () => {
    render(<Card {...mockCard} onClick={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Card {...mockCard} onClick={handleClick} />);
    
    screen.getByText('Test Card').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
}); 