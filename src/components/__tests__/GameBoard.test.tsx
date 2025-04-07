import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameBoard } from '../GameBoard';
import { GameProvider } from '../../context/GameContext';

// Mock the useGame hook
jest.mock('../../hooks/useGameState', () => ({
  useGameState: () => ({
    currentCards: [
      { id: 1, name: 'Card 1', description: 'Description 1' },
      { id: 2, name: 'Card 2', description: 'Description 2' },
      { id: 3, name: 'Card 3', description: 'Description 3' }
    ],
    currentSubject: 'Player 1',
    players: ['Player 1', 'Player 2'],
    currentRound: 1,
    totalRounds: 3,
    submitRanking: jest.fn(),
    startNewRound: jest.fn()
  })
}));

describe('GameBoard Component', () => {
  it('renders game title and status', () => {
    render(
      <GameProvider>
        <GameBoard />
      </GameProvider>
    );
    
    expect(screen.getByText('Reputations')).toBeInTheDocument();
    expect(screen.getByText('Player 1\'s Turn')).toBeInTheDocument();
    expect(screen.getByText('Round 1 of 3')).toBeInTheDocument();
  });

  it('renders all cards in hand', () => {
    render(
      <GameProvider>
        <GameBoard />
      </GameProvider>
    );
    
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(screen.getByText('Card 3')).toBeInTheDocument();
  });

  it('disables submit button when not all cards are ranked', () => {
    render(
      <GameProvider>
        <GameBoard />
      </GameProvider>
    );
    
    const submitButton = screen.getByText('Submit Ranking');
    expect(submitButton).toBeDisabled();
  });
}); 