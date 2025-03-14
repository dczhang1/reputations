/**
 * Reputations Game - Data Module
 * Contains game data and state management functions.
  * Copyright © 2025 Don C. Zhang. All rights reserved.

 */

// Game configuration and default values
const GameConfig = {
  // Game modes
  MODES: {
    CLASSICAL: 'classical',
    COMPETITIVE: 'competitive'
  },
  
  // Default settings
  DEFAULTS: {
    ROUNDS: 5,
    MIN_PLAYERS: {
      CLASSICAL: 2,
      COMPETITIVE: 3
    }
  },
  
  // Scoring values
  SCORING: {
    EXACT_MATCH: 10,
    CLOSE_MATCH: 5,
    MAX_ROUND_POINTS: 50
  }
};

// Game state object - central source of truth for game data
const GameState = {
  gameMode: GameConfig.MODES.CLASSICAL,
  players: [],
  currentSubject: '',
  currentRound: 0,
  totalRounds: GameConfig.DEFAULTS.ROUNDS,
  currentCards: [],
  subjectRanking: [],
  informantRanking: [],
  scores: { team: 0, game: 0 },
  
  // Reset the game state to defaults
  reset() {
    this.currentRound = 0;
    this.subjectRanking = [];
    this.informantRanking = [];
    this.scores = { team: 0, game: 0 };
  },
  
  // Get minimum players required for current game mode
  getMinPlayers() {
    return this.gameMode === GameConfig.MODES.CLASSICAL ? 
      GameConfig.DEFAULTS.MIN_PLAYERS.CLASSICAL : 
      GameConfig.DEFAULTS.MIN_PLAYERS.COMPETITIVE;
  },
  
  // Check if a round is complete
  isRoundComplete() {
    return this.subjectRanking.length > 0 && this.informantRanking.length > 0;
  },
  
  // Check if the game should end
  shouldEndGame() {
    return this.currentRound >= this.totalRounds;
  }
};

// Trait cards data
const traitCards = [
    {
        id: 1,
        name: "Adventurous",
        description: "Loves exploring new places and trying wild things."
    },
    {
        id: 2,
        name: "Annoying",
        description: "Gets on people's nerves without meaning to (or maybe they do)."
    },
    {
        id: 3,
        name: "Bold",
        description: "Stands up and speaks out, no matter who's listening."
    },
    {
        id: 4,
        name: "Bossy",
        description: "Likes telling everyone what to do, all the time."
    },
    {
        id: 5,
        name: "Calm",
        description: "Stays cool and chill, even when things get crazy."
    },
    {
        id: 6,
        name: "Chatty",
        description: "Never stops talking—always has a story to share."
    },
    {
        id: 7,
        name: "Cheerful",
        description: "Brightens the room with smiles and good vibes."
    },
    {
        id: 8,
        name: "Clumsy",
        description: "Trips over nothing and drops stuff way too often."
    },
    {
        id: 9,
        name: "Clever",
        description: "Quick with ideas and always has a smart fix."
    },
    {
        id: 10,
        name: "Confident",
        description: "Walks in like they own the place, every time."
    },
    {
        id: 11,
        name: "Creative",
        description: "Comes up with wild, artsy, or out-there stuff."
    },
    {
        id: 12,
        name: "Cunning",
        description: "Sneaky and smart, always a step ahead."
    },
    {
        id: 13,
        name: "Curious",
        description: "Asks tons of questions and loves figuring things out."
    },
    {
        id: 14,
        name: "Dependable",
        description: "You can count on them, no matter what."
    },
    {
        id: 15,
        name: "Dramatic",
        description: "Turns everything into a big, loud soap opera."
    },
    {
        id: 16,
        name: "Easygoing",
        description: "Rolls with whatever, no stress, no fuss."
    },
    {
        id: 17,
        name: "Energetic",
        description: "Bouncing off the walls, full of life."
    },
    {
        id: 18,
        name: "Flaky",
        description: "Forgets plans or bails at the last second."
    },
    {
        id: 19,
        name: "Friendly",
        description: "Makes buddies with everyone they meet."
    },
    {
        id: 20,
        name: "Funny",
        description: "Cracks jokes that get the whole room laughing."
    },
    {
        id: 21,
        name: "Generous",
        description: "Shares everything—time, snacks, you name it."
    },
    {
        id: 22,
        name: "Grumpy",
        description: "Always in a bad mood, grumbling about something."
    },
    {
        id: 23,
        name: "Honest",
        description: "Says it like it is, even if it stings."
    },
    {
        id: 24,
        name: "Impulsive",
        description: "Jumps into things without thinking twice."
    },
    {
        id: 25,
        name: "Kind",
        description: "Goes out of their way to help and be nice."
    },
    {
        id: 26,
        name: "Lazy",
        description: "Loves napping and dodging anything hard."
    },
    {
        id: 27,
        name: "Loud",
        description: "You hear them coming from a mile away."
    },
    {
        id: 28,
        name: "Loyal",
        description: "Sticks by you through thick and thin."
    },
    {
        id: 29,
        name: "Messy",
        description: "Leaves chaos wherever they go—clothes, dishes, all of it."
    },
    {
        id: 30,
        name: "Moody",
        description: "Up one minute, down the next, unpredictable."
    }
];

// Helper to draw random cards
function getRandomCards(count = 5) {
  const shuffled = [...traitCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Export for use in other modules
window.GameConfig = GameConfig;
window.GameState = GameState;
window.traitCards = traitCards;
window.getRandomCards = getRandomCards;