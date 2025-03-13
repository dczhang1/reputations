# Reputations Card Game

A browser-based implementation of the Reputations personality card game where players predict how others rank personality traits.

## File Structure

```
reputations/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Styling for the game
├── js/
│   ├── data.js             # Game data and state 
│   └── game.js             # Game logic and functions
└── README.md               # This file
```

## Game Features

- **Classical Mode**: Team vs. the Game
- **Competitive Mode**: Players compete individually (upcoming)
- **Manual Round Advancement**: Review scores before proceeding
- **Card Ranking**: Intuitive card selection system
- **Score Tracking**: Detailed breakdown of points

## Setup

1. Clone this repository
2. Open `index.html` in a web browser
3. No server or build process needed

## Usage

1. Choose a game mode (Classical or Competitive)
2. Enter player names
3. Follow the on-screen instructions to play

## Development

This project is structured to make feature additions straightforward:

- `data.js` contains all game state and data
- `game.js` contains all game logic and DOM manipulation
- `