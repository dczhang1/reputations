import React, { useState } from 'react';
import styled from 'styled-components';
import { useGameState } from '../hooks/useGameState';
import { GameInstructions } from './GameInstructions';
import { GameMode, DEFAULT_GAME_CONFIG } from '../types/game';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    border-color: #3498db;
    outline: none;
  }
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

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const PlayerList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PlayerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f7f9fc;
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  padding: 0.3rem 0.6rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 0.5rem;
`;

const GameModeSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f7f9fc;
  border-radius: 4px;
`;

const ModeOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input[type="radio"] {
    margin: 0;
  }
`;

const ToggleInstructions = styled.button`
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  text-decoration: underline;
  margin: 1rem 0;
  font-size: 1rem;
`;

export const WelcomeScreen: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.CLASSICAL);
  
  const { players, addPlayer, removePlayer, startNewRound } = useGameState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter a player name');
      return;
    }
    if (players.includes(playerName.trim())) {
      setError('Player name already exists');
      return;
    }
    addPlayer(playerName.trim());
    setPlayerName('');
    setError('');
  };

  const handleStartGame = () => {
    const minPlayers = gameMode === GameMode.CLASSICAL 
      ? DEFAULT_GAME_CONFIG.DEFAULTS.MIN_PLAYERS.CLASSICAL 
      : DEFAULT_GAME_CONFIG.DEFAULTS.MIN_PLAYERS.COMPETITIVE;

    if (players.length < minPlayers) {
      setError(`Need at least ${minPlayers} players for ${gameMode} mode`);
      return;
    }
    startNewRound();
  };

  return (
    <Container>
      <Title>Welcome to Reputations</Title>
      
      <GameModeSelect>
        <ModeOption>
          <input
            type="radio"
            value={GameMode.CLASSICAL}
            checked={gameMode === GameMode.CLASSICAL}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
          />
          Classical Mode (2-4 players)
        </ModeOption>
        <ModeOption>
          <input
            type="radio"
            value={GameMode.COMPETITIVE}
            checked={gameMode === GameMode.COMPETITIVE}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
          />
          Competitive Mode (3-6 players)
        </ModeOption>
      </GameModeSelect>

      <ToggleInstructions onClick={() => setShowInstructions(!showInstructions)}>
        {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
      </ToggleInstructions>

      {showInstructions && <GameInstructions gameMode={gameMode} />}

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
        />
        <Button type="submit">Add Player</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>

      <PlayerList>
        {players.map((player) => (
          <PlayerItem key={player}>
            <span>{player}</span>
            <RemoveButton onClick={() => removePlayer(player)}>Remove</RemoveButton>
          </PlayerItem>
        ))}
      </PlayerList>

      <Button 
        onClick={handleStartGame}
        disabled={players.length < (gameMode === GameMode.CLASSICAL ? 2 : 3)}
        style={{ marginTop: '2rem' }}
      >
        Start Game
      </Button>
    </Container>
  );
}; 