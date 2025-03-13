/**
 * Reputations Game - Data Module
 * Contains game data and state management.
 */

// Game state variables
let gameMode = '';
let players = [];
let currentSubject = '';
let currentRound = 0;
let totalRounds = 5;
let currentCards = [];
let subjectRanking = []; // Will store card IDs in order
let informantRanking = []; // Will store card IDs in order
let scores = { team: 0, game: 0 };

// Trait cards (simplified set)
const traitCards = [
    { id: 1, name: "Adventurous", description: "Loves exploring new places and trying wild things" },
    { id: 2, name: "Bold", description: "Stands up and speaks out, no matter who's listening" },
    { id: 3, name: "Calm", description: "Stays cool and chill, even when things get crazy" },
    { id: 4, name: "Cheerful", description: "Brightens the room with smiles and good vibes" },
    { id: 5, name: "Clever", description: "Quick with ideas and always has a smart fix" },
    { id: 6, name: "Creative", description: "Comes up with wild, artsy, or out-there stuff" },
    { id: 7, name: "Curious", description: "Asks tons of questions and loves figuring things out" },
    { id: 8, name: "Funny", description: "Cracks jokes that get the whole room laughing" },
    { id: 9, name: "Kind", description: "Goes out of their way to help and be nice" },
    { id: 10, name: "Loyal", description: "Sticks by you through thick and thin" }
];

// Full trait card set (for future expansion)
const fullTraitCards = [
    { id: 1, name: "Adventurous", description: "Loves exploring new places and trying wild things" },
    { id: 2, name: "Annoying", description: "Gets on people's nerves without meaning to (or maybe they do)" },
    { id: 3, name: "Bold", description: "Stands up and speaks out, no matter who's listening" },
    { id: 4, name: "Bossy", description: "Likes telling everyone what to do, all the time" },
    { id: 5, name: "Calm", description: "Stays cool and chill, even when things get crazy" },
    { id: 6, name: "Chatty", description: "Never stops talking—always has a story to share" },
    { id: 7, name: "Cheerful", description: "Brightens the room with smiles and good vibes" },
    { id: 8, name: "Clumsy", description: "Trips over nothing and drops stuff way too often" },
    { id: 9, name: "Clever", description: "Quick with ideas and always has a smart fix" },
    { id: 10, name: "Confident", description: "Walks in like they own the place, every time" },
    { id: 11, name: "Creative", description: "Comes up with wild, artsy, or out-there stuff" },
    { id: 12, name: "Cunning", description: "Sneaky and smart, always a step ahead" },
    { id: 13, name: "Curious", description: "Asks tons of questions and loves figuring things out" },
    { id: 14, name: "Dependable", description: "You can count on them, no matter what" },
    { id: 15, name: "Dramatic", description: "Turns everything into a big, loud soap opera" },
    { id: 16, name: "Easygoing", description: "Rolls with whatever, no stress, no fuss" },
    { id: 17, name: "Energetic", description: "Bouncing off the walls, full of life" },
    { id: 18, name: "Flaky", description: "Forgets plans or bails at the last second" },
    { id: 19, name: "Friendly", description: "Makes buddies with everyone they meet" },
    { id: 20, name: "Funny", description: "Cracks jokes that get the whole room laughing" },
    { id: 21, name: "Generous", description: "Shares everything—time, snacks, you name it" },
    { id: 22, name: "Grumpy", description: "Always in a bad mood, grumbling about something" },
    { id: 23, name: "Honest", description: "Says it like it is, even if it stings" },
    { id: 24, name: "Impulsive", description: "Jumps into things without thinking twice" },
    { id: 25, name: "Kind", description: "Goes out of their way to help and be nice" },
    { id: 26, name: "Lazy", description: "Loves napping and dodging anything hard" },
    { id: 27, name: "Loud", description: "You hear them coming from a mile away" },
    { id: 28, name: "Loyal", description: "Sticks by you through thick and thin" },
    { id: 29, name: "Messy", description: "Leaves chaos wherever they go—clothes, dishes, all of it" },
    { id: 30, name: "Moody", description: "Up one minute, down the next, unpredictable" }
];

// Icons for trait cards (for future use)
const traitIcons = {
    "Adventurous": "🧗‍♂️", "Annoying": "😤", "Bold": "💪", "Bossy": "👑", 
    "Calm": "😌", "Chatty": "🗣️", "Cheerful": "😊", "Clumsy": "🤪", 
    "Clever": "🧠", "Confident": "😎", "Creative": "🎨", "Cunning": "🦊", 
    "Curious": "🔎", "Dependable": "🤝", "Dramatic": "🎭", "Easygoing": "🛋️", 
    "Energetic": "⚡", "Flaky": "❄️", "Friendly": "👋", "Funny": "😂", 
    "Generous": "🎁", "Grumpy": "😠", "Honest": "💯", "Impulsive": "💥", 
    "Kind": "💖", "Lazy": "😴", "Loud": "📢", "Loyal": "🐕", 
    "Messy": "🌪️", "Moody": "🎭"
};
