import React, { useState } from 'react';
import styled from 'styled-components';
import { useGameState } from '../hooks/useGameState';
import { Card } from './Card';
import { Hand } from './Hand';
import { RankedCard } from '../types/game';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const GameTitle = styled.h1`
  color: #2c3e50;
  margin: 0;
`;

const GameStatus = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ScoreDisplay = styled.div`
  display: flex;
  gap: 1rem;
`;

const ScoreCard = styled.div`
  background-color: #f7f9fc;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
`;

const ScoreLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const ScoreValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const PlayerInfo = styled.div`
  background-color: #f7f9fc;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
`;

const RoleLabel = styled.span`
  font-weight: bold;
  color: #2c3e50;
`;

export const GameBoard: React.FC = () => {
  const {
    currentRound,
    currentCards,
    subject,
    informant,
    gameMode,
    scores,
    rankings,
    submitRanking
  } = useGameState();

  const [selectedCards, setSelectedCards] = useState<RankedCard[]>([]);
  const currentPlayer = subject; // This should be determined by the current turn

  const handleCardClick = (card: RankedCard) => {
    if (selectedCards.find(c => c.id === card.id)) {
      return;
    }

    const newSelectedCards = [...selectedCards, { ...card, rank: selectedCards.length + 1 }];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === currentCards.length) {
      submitRanking(currentPlayer, newSelectedCards);
      setSelectedCards([]);
    }
  };

  const handleSubmit = () => {
    if (selectedCards.length === currentCards.length) {
      submitRanking(currentPlayer, selectedCards);
      setSelectedCards([]);
    }
  };

  return (
    <Container>
      <GameHeader>
        <GameTitle>Round {currentRound}</GameTitle>
        <GameStatus>
          <ScoreDisplay>
            <ScoreCard>
              <ScoreLabel>Round Score</ScoreLabel>
              <ScoreValue>{scores[currentPlayer] || 0}</ScoreValue>
            </ScoreCard>
            <ScoreCard>
              <ScoreLabel>Total Score</ScoreLabel>
              <ScoreValue>
                {Object.values(scores).reduce((a, b) => a + b, 0)}
              </ScoreValue>
            </ScoreCard>
          </ScoreDisplay>
        </GameStatus>
      </GameHeader>

      <PlayerInfo>
        <p>
          <RoleLabel>Subject:</RoleLabel> {subject}
        </p>
        <p>
          <RoleLabel>Informant:</RoleLabel> {informant}
        </p>
        <p>
          <RoleLabel>Game Mode:</RoleLabel> {gameMode}
        </p>
      </PlayerInfo>

      <Hand
        cards={currentCards}
        selectedCards={selectedCards}
        onCardClick={handleCardClick}
      />

      <Button
        onClick={handleSubmit}
        disabled={selectedCards.length !== currentCards.length}
        style={{ marginTop: '2rem' }}
      >
        Submit Ranking
      </Button>
    </Container>
  );
}; 