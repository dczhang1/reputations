import { useState, useCallback } from 'react';
import { GameMode, GameState, Player, RankedCard, DEFAULT_GAME_CONFIG } from '../types/game';

interface GameStateHook {
  players: string[];
  currentRound: number;
  currentCards: RankedCard[];
  subject: string;
  informant: string;
  gameMode: GameMode;
  scores: Record<string, number>;
  rankings: Record<string, RankedCard[]>;
  isGameOver: boolean;
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  startNewRound: () => void;
  submitRanking: (player: string, cards: RankedCard[]) => void;
  resetGame: () => void;
}

export const useGameState = (): GameStateHook => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentRound: 0,
    currentCards: [],
    subject: '',
    informant: '',
    gameMode: GameMode.CLASSICAL,
    scores: {},
    rankings: {},
    isGameOver: false
  });

  const addPlayer = useCallback((name: string) => {
    setGameState((prevState: GameState) => ({
      ...prevState,
      players: [...prevState.players, name],
      scores: { ...prevState.scores, [name]: 0 },
      rankings: { ...prevState.rankings, [name]: [] }
    }));
  }, []);

  const removePlayer = useCallback((name: string) => {
    setGameState((prevState: GameState) => {
      const { [name]: removedScore, ...remainingScores } = prevState.scores;
      const { [name]: removedRankings, ...remainingRankings } = prevState.rankings;
      return {
        ...prevState,
        players: prevState.players.filter((player: string) => player !== name),
        scores: remainingScores,
        rankings: remainingRankings
      };
    });
  }, []);

  const startNewRound = useCallback(() => {
    setGameState((prevState: GameState) => {
      const nextRound = prevState.currentRound + 1;
      const isGameOver = nextRound > DEFAULT_GAME_CONFIG.DEFAULTS.ROUNDS;
      
      // Select new subject and informant
      const availablePlayers = prevState.players.filter(
        (player: string) => player !== prevState.subject && player !== prevState.informant
      );
      
      const randomIndex = Math.floor(Math.random() * availablePlayers.length);
      const newSubject = availablePlayers[randomIndex];
      const remainingPlayers = availablePlayers.filter((_, i: number) => i !== randomIndex);
      const newInformant = remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)];

      return {
        ...prevState,
        currentRound: nextRound,
        currentCards: [],
        subject: newSubject,
        informant: newInformant,
        rankings: {},
        isGameOver
      };
    });
  }, []);

  const submitRanking = useCallback((player: string, cards: RankedCard[]) => {
    setGameState((prevState: GameState) => {
      const newRankings = { ...prevState.rankings, [player]: cards };
      const allRankingsSubmitted = Object.keys(newRankings).length === prevState.players.length;

      if (!allRankingsSubmitted) {
        return { ...prevState, rankings: newRankings };
      }

      // Calculate scores when all players have submitted their rankings
      const newScores = { ...prevState.scores };
      const subjectRanking = newRankings[prevState.subject];
      const informantRanking = newRankings[prevState.informant];

      // Calculate scores based on game mode
      if (prevState.gameMode === GameMode.CLASSICAL) {
        // Classical mode: Score based on agreement between subject and informant
        const agreementScore = subjectRanking.reduce((score: number, card: RankedCard, index: number) => {
          const informantIndex = informantRanking.findIndex((c: RankedCard) => c.id === card.id);
          return score + Math.abs(index - informantIndex);
        }, 0);

        newScores[prevState.subject] += agreementScore;
        newScores[prevState.informant] += agreementScore;
      } else {
        // Competitive mode: Score based on individual rankings
        prevState.players.forEach((p: string) => {
          const ranking = newRankings[p];
          const score = ranking.reduce((total: number, card: RankedCard, index: number) => {
            return total + (ranking.length - index);
          }, 0);
          newScores[p] += score;
        });
      }

      return {
        ...prevState,
        rankings: newRankings,
        scores: newScores
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      players: [],
      currentRound: 0,
      currentCards: [],
      subject: '',
      informant: '',
      gameMode: GameMode.CLASSICAL,
      scores: {},
      rankings: {},
      isGameOver: false
    });
  }, []);

  return {
    ...gameState,
    addPlayer,
    removePlayer,
    startNewRound,
    submitRanking,
    resetGame
  };
}; 