# Game Design Document for "Reputations"

## Table of Contents
- [Game Objective and Overview](#game-objective-and-overview)
- [Game Mechanics](#game-mechanics)
  - [Game Modes](#game-modes)
  - [Game Length](#game-length)
  - [Game Flow](#game-flow)
- [Trait Card System](#trait-card-system)
  - [Card Structure](#card-structure)
  - [Card Distribution](#card-distribution)
- [App Design](#app-design)
  - [Visual System](#visual-system)
  - [Interaction Design](#interaction-design)
  - [UI Components](#ui-components)
- [Technical Requirements](#technical-requirements)
- [Future Expansion Ideas](#future-expansion-ideas)
- [Appendices](#appendices)
  - [Appendix A: Trait Cards](#appendix-a-trait-cards-demo)
  - [Appendix B: Glossary](#appendix-b-glossary)

## Game Objective and Overview

Reputations is a social card game centered around personality prediction. Players take on either "subject" or "informant" roles, with the subject ranking five randomly drawn trait cards based on self-perception, while informants predict these rankings. Scoring is based on the accuracy of the informants' predictions compared to the subject's self-assessment. The game supports 2+ players and takes 15-30 minutes to play, depending on the selected mode, player count, and scoring method.

## Game Mechanics

### Game Modes

1. **Classical Mode**
   - 2+ players
   - Human players compete as a team against the "game"
   - Team scores by correctly predicting the subject's rankings
   - Incorrect predictions award points to the "game"
   - Scoring balanced based on player count

2. **Competitive Mode**
   - 3-6 players
   - Informants predict individually
   - Players earn points based on their prediction accuracy
   - Highest score wins

### Game Length

The game can end through one of three methods:

- **Set Score**: Game ends when a player reaches a target score
- **Set Rounds**: Game ends after a predetermined number of rounds
- **Sandbox**: No set ending; continues at players' discretion (for demos, casual play)

### Game Flow

1. **Game Start**: Select mode and scoring method; enter player names
2. **Player Assignment**: One player randomly designated as "subject"; others as "informants"
3. **Card Drawing**: Five trait cards randomly presented on screen
4. **Subject Ranking**: Subject ranks cards from "most like me" to "least like me"
5. **Informant Ranking**: Informants predict the subject's ranking order
6. **Scoring**: Calculate points based on prediction accuracy
7. **New Round**: Assign a new subject and repeat steps 3-6
8. **Game End**: Conclude based on selected end condition

## Trait Card System

### Card Structure

Each trait card presents a personality attribute with:

**Front Side**
- Trait name (e.g., "sociable," "narcissistic")
- Brief 1-2 sentence description in accessible language
- Visual icon representing the trait

**Back Side**
- Notable examples: 3 famous figures exemplifying the trait
- Additional descriptive details (optional)

### Card Distribution

- Random selection from the full deck of 30 traits
- No repeating traits within a single round
- System tracks previously used traits to ensure variety

## App Design

### Visual System

#### Color System
- **Primary**: #7b68ee (buttons, card borders, subject)
  - Variants: #9370db (hover), #5a4db7 (active)
- **Secondary**: #ff8787 (informants, resets, prompts)
- **Feedback**: #4caf50 (green, correct), #e57373 (red, incorrect)
- **Background**: #f5f6fa → #e8eaf6 gradient
- **Text**: #2a2a2a (body), #5a4db7 (headings)

#### Typography
- **Font**: Poppins (fallback: Helvetica, Arial, sans-serif)
- **Sizes**: H1 2.2rem (600), H2 1.6rem (500), H3 1.3rem (500), Body 1rem (1.6 lh, 400)

### Interaction Design

#### Card Interactions
- Drag or click to rank (1-5)
- Flip animation for card details
- Visual feedback for selection and submission

#### Transitions
- Assignment → Draw: 0.5s fade
- Subject → Informant: 0.7s slide right
- Informant → Score: 0.2s stagger reveal
- Score → Next: 0.3s pulse, fade

#### Feedback
- Selection scales 1.05, glows #7b68ee
- Score: green +10 float animation, red -5 shake animation
- Status updates: 1.2rem centered text with fade

### UI Components

- **Main Menu**: Game mode selection, options
- **Player Setup**: Name entry fields with validation
- **Game Board**: Cards, ranking indicators, submit buttons
- **Results Panel**: Match visualization, score display
- **Game End**: Winner announcement, final scores, play again option
- **Persistent Menu**: Hamburger menu with game options
- **Modals**: Rules, options, confirmation dialogs

## Technical Requirements

The application follows a module pattern with separation of concerns:

- **State Management**: Centralized via GameState object
- **Modules**: GameController, UIController, PlayerManager
- **DOM Caching**: For optimized performance
- **Event Handling**: Centralized in GameController.bindEvents()
- **CSS Architecture**: Variable-based theming, component organization

## Future Expansion Ideas

### Additional Game Modes

- **Historical Figure Mode**: Players predict rankings for historical personalities
- **Professional Development**: Leadership assessment and team-building exercises

### Content Expansions

- **Professional Traits**: Workplace-focused attributes
- **Relationship Traits**: Love languages, attachment styles
- **Child-Friendly Set**: Age-appropriate traits for younger players
- **NSFW Expansion**: Adult-oriented traits

## Appendices

### Appendix A: Trait Cards (Demo)

1. **Adventurous** - Loves exploring new places and trying wild things.
2. **Annoying** - Gets on people's nerves without meaning to (or maybe they do).
3. **Bold** - Stands up and speaks out, no matter who's listening.
4. **Bossy** - Likes telling everyone what to do, all the time.
5. **Calm** - Stays cool and chill, even when things get crazy.
6. **Chatty** - Never stops talking—always has a story to share.
7. **Cheerful** - Brightens the room with smiles and good vibes.
8. **Clumsy** - Trips over nothing and drops stuff way too often.
9. **Clever** - Quick with ideas and always has a smart fix.
10. **Confident** - Walks in like they own the place, every time.
11. **Creative** - Comes up with wild, artsy, or out-there stuff.
12. **Cunning** - Sneaky and smart, always a step ahead.
13. **Curious** - Asks tons of questions and loves figuring things out.
14. **Dependable** - You can count on them, no matter what.
15. **Dramatic** - Turns everything into a big, loud soap opera.
16. **Easygoing** - Rolls with whatever, no stress, no fuss.
17. **Energetic** - Bouncing off the walls, full of life.
18. **Flaky** - Forgets plans or bails at the last second.
19. **Friendly** - Makes buddies with everyone they meet.
20. **Funny** - Cracks jokes that get the whole room laughing.
21. **Generous** - Shares everything—time, snacks, you name it.
22. **Grumpy** - Always in a bad mood, grumbling about something.
23. **Honest** - Says it like it is, even if it stings.
24. **Impulsive** - Jumps into things without thinking twice.
25. **Kind** - Goes out of their way to help and be nice.
26. **Lazy** - Loves napping and dodging anything hard.
27. **Loud** - You hear them coming from a mile away.
28. **Loyal** - Sticks by you through thick and thin.
29. **Messy** - Leaves chaos wherever they go—clothes, dishes, all of it.
30. **Moody** - Up one minute, down the next, unpredictable.

### Appendix B: Glossary

- **Subject**: The player whose personality is being assessed in a round
- **Informant**: Players who predict the subject's trait rankings
- **Trait Card**: Card representing a personality characteristic
- **Exact Match**: When an informant correctly predicts a trait's exact position
- **Close Match**: When an informant predicts a trait's position off by one