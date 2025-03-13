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

## Development

This project is structured to make feature additions straightforward:

- `data.js` contains all game state and data
- `game.js` contains all game logic and DOM manipulation
- `styles.css` contains all styling


### Modifying Game Data

The trait cards are stored in `data.js`. To add more cards:

1. Add new entries to the `traitCards` array
2. Make sure each card has a unique `id`
3. Add corresponding icons to the `traitIcons` object if needed

### Implementing UI Changes

For UI modifications:

1. Add/modify HTML elements in `index.html`
2. Add styling in `styles.css`
3. Add any necessary event handlers in `game.js`

## Game Mechanics

### Scoring

Points are awarded based on prediction accuracy:
- **Exact match**: 10 points
- **Off by one position**: 5 points
- **No match**: 0 points

The maximum score possible per round is 50 points.

### Game Modes

- **Classical Mode**: All players work together as a team to score points. The "game" gets points when predictions are incorrect.
- **Competitive Mode** (upcoming): Players compete individually to see who can best predict others' self-rankings.

## Future Enhancements

Planned features include:

1. Drag and drop card ranking
2. Card flipping to show examples
3. Enhanced visual design
4. Player avatars and role indicators
5. Timer option
6. Sound effects
7. Local storage for saving game progress

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is available for personal and educational use.
