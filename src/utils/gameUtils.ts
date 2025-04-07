import { RankedCard } from '../types/game';
import { DEFAULT_GAME_CONFIG } from '../types/game';

export const validateRanking = (cards: RankedCard[]): boolean => {
  if (!cards || cards.length === 0) return false;
  
  // Check if all cards have a rank
  const hasAllRanks = cards.every(card => card.rank !== undefined);
  if (!hasAllRanks) return false;
  
  // Check if ranks are sequential and unique
  const ranks = cards.map(card => card.rank).sort((a, b) => (a || 0) - (b || 0));
  const isSequential = ranks.every((rank, index) => rank === index + 1);
  
  return isSequential;
};

export const calculateScore = (subjectRanking: RankedCard[], playerRanking: RankedCard[]): number => {
  if (!validateRanking(subjectRanking) || !validateRanking(playerRanking)) {
    return 0;
  }

  let score = 0;
  const maxScore = subjectRanking.length;

  subjectRanking.forEach((card, index) => {
    const playerIndex = playerRanking.findIndex(c => c.id === card.id);
    if (playerIndex !== -1) {
      // Score is higher when rankings are closer
      score += maxScore - Math.abs(index - playerIndex);
    }
  });

  return score;
};

export const getNextPlayer = (currentPlayer: string, players: string[]): string => {
  const currentIndex = players.indexOf(currentPlayer);
  const nextIndex = (currentIndex + 1) % players.length;
  return players[nextIndex];
};

export const formatScore = (score: number): string => {
  return score.toLocaleString();
}; 