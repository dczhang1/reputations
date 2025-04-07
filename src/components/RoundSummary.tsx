import React from 'react';
import styled from 'styled-components';
import { useGameState } from '../hooks/useGameState';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
`;

const ScoreTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const TableHeader = styled.th`
  background-color: #f7f9fc;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #2980b9;
  }
`;

export const RoundSummary: React.FC = () => {
  const { 
    currentRound, 
    totalRounds, 
    players, 
    scores,
    startNewRound,
    isGameOver
  } = useGameState();

  const handleContinue = () => {
    if (isGameOver) {
      // Reset game or show final results
      window.location.reload();
    } else {
      startNewRound();
    }
  };

  return (
    <Container>
      <Title>Round {currentRound} Summary</Title>
      <ScoreTable>
        <thead>
          <tr>
            <TableHeader>Player</TableHeader>
            <TableHeader>Score</TableHeader>
            <TableHeader>Total Score</TableHeader>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player}>
              <TableCell>{player}</TableCell>
              <TableCell>{scores[player]?.[currentRound] || 0}</TableCell>
              <TableCell>
                {Object.values(scores[player] || {}).reduce((a, b) => a + b, 0)}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </ScoreTable>
      <Button onClick={handleContinue}>
        {isGameOver ? 'Start New Game' : 'Continue to Next Round'}
      </Button>
    </Container>
  );
}; 