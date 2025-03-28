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
    // Original traits retained
    {
        id: 1,
        name: "Adventurous",
        description: "Loves exploring new places and trying wild things."
    },
    {
        id: 2,
        name: "Bold",
        description: "Stands up and speaks out, no matter who's listening."
    },
    {
        id: 3,
        name: "Calm",
        description: "Stays cool and chill, even when things get crazy."
    },
    {
        id: 4,
        name: "Cheerful",
        description: "Brightens the room with smiles and good vibes."
    },
    {
        id: 5,
        name: "Clever",
        description: "Quick with ideas and always has a smart fix."
    },
    {
        id: 6,
        name: "Confident",
        description: "Walks in like they own the place, every time."
    },
    {
        id: 7,
        name: "Creative",
        description: "Comes up with wild, artsy, or out-there stuff."
    },
    {
        id: 8,
        name: "Curious",
        description: "Asks tons of questions and loves figuring things out."
    },
    {
        id: 9,
        name: "Dramatic",
        description: "Turns everything into a big, loud soap opera."
    },
    {
        id: 10,
        name: "Energetic",
        description: "Bouncing off the walls, full of life."
    },
    {
        id: 11,
        name: "Funny",
        description: "Cracks jokes that get the whole room laughing."
    },
    {
        id: 12,
        name: "Generous",
        description: "Shares everything—time, snacks, you name it."
    },
    {
        id: 13,
        name: "Impulsive",
        description: "Jumps into things without thinking twice."
    },
    {
        id: 14,
        name: "Kind",
        description: "Goes out of their way to help and be nice."
    },
    {
        id: 15,
        name: "Loyal",
        description: "Sticks by you through thick and thin."
    },
    
    // New fun traits for a party game
    {
        id: 16,
        name: "Diplomatic",
        description: "Carefully chooses words to avoid offending anyone, even in tense situations."
    },
    {
        id: 17,
        name: "Storyteller",
        description: "Can turn a trip to the grocery store into an epic adventure."
    },
    {
        id: 18,
        name: "Night Owl",
        description: "Comes alive after midnight and hates early mornings."
    },
    {
        id: 19,
        name: "Patient",
        description: "Can wait forever without complaint, never rushing or getting frustrated."
    },
    {
        id: 20,
        name: "Social Butterfly",
        description: "Knows everyone at the party and introduces you to them all."
    },
    {
        id: 21,
        name: "Perfectionist",
        description: "Won't stop until everything is exactly right, down to the pixel."
    },
    {
        id: 22,
        name: "Thrill-Seeker",
        description: "Always first in line for the scariest roller coaster."
    },
    {
        id: 23,
        name: "Procrastinator",
        description: "Why do today what can be put off until the absolute last minute?"
    },
    {
        id: 24,
        name: "Pop Culture Maven",
        description: "Quotes movies perfectly and knows all the latest trends."
    },
    {
        id: 25,
        name: "Overachiever",
        description: "Has three side hustles and still finds time to run marathons."
    },
    {
        id: 26,
        name: "Sarcastic",
        description: "Has mastered the art of eye-rolling and dry comebacks."
    },
    {
        id: 27,
        name: "Conspiracy Theorist",
        description: "Thinks aliens are involved in just about everything."
    },
    {
        id: 28,
        name: "Persuasive",
        description: "Could sell ice to penguins and make them thank you for the opportunity."
    },
    {
        id: 29,
        name: "Charismatic",
        description: "Draws people in naturally and lights up any room they enter."
    },
    {
        id: 30,
        name: "Optimistic",
        description: "Always sees the silver lining and believes everything will work out."
    },
    {
        id: 31,
        name: "Competitive",
        description: "Turns everything into a contest they must win at all costs."
    },
    {
        id: 32,
        name: "Peacemaker",
        description: "Steps in to resolve arguments before they escalate."
    },
    {
        id: 33,
        name: "Germaphobe",
        description: "Always has hand sanitizer and avoids doorknobs like the plague."
    },
    {
        id: 34,
        name: "Shameless",
        description: "Has absolutely zero embarrassment filter in any situation."
    },
    {
        id: 35,
        name: "Gullible",
        description: "Falls for practical jokes and believes urban legends easily."
    },
    {
        id: 36,
        name: "Nostalgic",
        description: "Constantly reminiscing about 'the good old days' from their youth."
    },
    {
        id: 37,
        name: "Party Planner",
        description: "Creates elaborate themes and never forgets the party favors."
    },
    {
        id: 38,
        name: "Risk-Averse",
        description: "Always has a backup plan for their backup plan."
    },
    {
        id: 39,
        name: "Observant",
        description: "Notices the smallest details that everyone else misses completely."
    },
    {
        id: 40,
        name: "Analytical",
        description: "Breaks down every situation logically before making any decision."
    },
    {
        id: 41,
        name: "Superstitious",
        description: "Avoids ladders, black cats, and breaking mirrors at all costs."
    },
    {
        id: 42,
        name: "Brutally Honest",
        description: "Will tell you if those pants make you look big. Brace yourself."
    },
    {
        id: 43,
        name: "Early Bird",
        description: "Up at dawn and accomplished more by 8 AM than most do all day."
    },
    {
        id: 44,
        name: "Absent-Minded",
        description: "Brilliant but forgetful, often losing track of time, keys, and conversations."
    },
    {
        id: 45,
        name: "Stubborn",
        description: "Once their mind is made up, a bulldozer couldn't move their opinion."
    },
    {
        id: 46,
        name: "Apologetic",
        description: "Says sorry for things that aren't remotely their fault, just in case."
    },
    {
        id: 47,
        name: "Oversharer",
        description: "Tells strangers their life story within minutes of meeting."
    },
    {
        id: 48,
        name: "Self-Deprecating",
        description: "Makes jokes at their own expense before anyone else can."
    },
    {
        id: 49,
        name: "Party Animal",
        description: "Last to leave and somehow still first to arrive at the next event."
    },
    {
        id: 50,
        name: "Indecisive",
        description: "Takes twenty minutes to choose between nearly identical options."
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
