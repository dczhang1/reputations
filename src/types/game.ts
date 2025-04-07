// Game configuration types
export enum GameMode {
  CLASSICAL = 'CLASSICAL',
  COMPETITIVE = 'COMPETITIVE'
}

export interface GameConfig {
  gameMode: GameMode;
  DEFAULTS: {
    ROUNDS: number;
    MIN_PLAYERS: {
      CLASSICAL: number;
      COMPETITIVE: number;
    };
    MAX_PLAYERS: {
      CLASSICAL: number;
      COMPETITIVE: number;
    };
  };
  SCORING: {
    CLASSICAL: {
      AGREEMENT_MULTIPLIER: number;
    };
    COMPETITIVE: {
      RANK_MULTIPLIER: number;
    };
  };
}

// Card types
export interface Card {
  id: string;
  text: string;
  category: string;
}

export interface RankedCard extends Card {
  rank?: number;
}

// Player types
export interface Player {
  id: string;
  name: string;
  score: number;
}

// Game state types
export interface GameState {
  players: string[];
  currentRound: number;
  currentCards: RankedCard[];
  subject: string;
  informant: string;
  gameMode: GameMode;
  scores: Record<string, number>;
  rankings: Record<string, RankedCard[]>;
  isGameOver: boolean;
}

// Action types
export enum GameActionType {
  SET_GAME_MODE = 'SET_GAME_MODE',
  ADD_PLAYER = 'ADD_PLAYER',
  REMOVE_PLAYER = 'REMOVE_PLAYER',
  START_GAME = 'START_GAME',
  START_ROUND = 'START_ROUND',
  SUBMIT_RANKING = 'SUBMIT_RANKING',
  UPDATE_SCORES = 'UPDATE_SCORES',
  RESET_GAME = 'RESET_GAME'
}

export interface GameAction {
  type: GameActionType;
  payload?: any;
}

// Default game configuration
export const DEFAULT_GAME_CONFIG: GameConfig = {
  gameMode: GameMode.CLASSICAL,
  DEFAULTS: {
    ROUNDS: 3,
    MIN_PLAYERS: {
      CLASSICAL: 2,
      COMPETITIVE: 3
    },
    MAX_PLAYERS: {
      CLASSICAL: 4,
      COMPETITIVE: 6
    }
  },
  SCORING: {
    CLASSICAL: {
      AGREEMENT_MULTIPLIER: 1
    },
    COMPETITIVE: {
      RANK_MULTIPLIER: 1
    }
  }
}; 