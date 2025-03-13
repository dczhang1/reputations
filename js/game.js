/**
 * Reputations Game - Game Logic Module
 * Contains all game functionality and event handling.
 */

// Main Game Controller
const GameController = {
  // Cache DOM elements for improved performance
  elements: {},
  
  // Store last round scores for highlighting changes
  lastScores: { team: 0, game: 0 },
  
  /**
   * Initialize the game
   */
  init() {
    // Cache all frequently used DOM elements
    this.cacheElements();
    
    // Initialize all event listeners
    this.bindEvents();
    
    // Initialize UI components
    UIController.initMenu();
    UIController.updateRoundDisplay();
    
    console.log("Game initialized");
  },
  
  /**
   * Cache DOM elements for repeated use
   */
  cacheElements() {
    // Screens
    this.elements.screens = {
      startMenu: document.getElementById('start-menu'),
      mainMenu: document.getElementById('main-menu'),
      playerSetup: document.getElementById('player-setup'),
      gameBoard: document.getElementById('game-board'),
      endScreen: document.getElementById('end-screen')
    };
    
    // Game elements
    this.elements.gameBoard = {
      cardsContainer: document.getElementById('cards-container'),
      gameStatus: document.getElementById('game-status'),
      submitBtn: document.getElementById('submit-btn'),
      nextRoundBtn: document.getElementById('next-round-btn'),
      scoreFeedback: document.getElementById('score-feedback'),
      rankingScale: document.querySelector('.ranking-scale'),
      teamScore: document.getElementById('team-score'),
      gameScore: document.getElementById('game-score'),
      pointsEarned: document.getElementById('points-earned'),
      matchDetails: document.getElementById('match-details')
    };
    
    // Round indicators
    this.elements.rounds = {
      current: document.getElementById('current-round'),
      total: document.getElementById('total-rounds'),
      currentResults: document.getElementById('current-round-results'),
      totalResults: document.getElementById('total-rounds-results')
    };
    
    // Player setup
    this.elements.playerSetup = {
      container: document.getElementById('player-inputs'),
      addBtn: document.getElementById('add-player-btn'),
      startBtn: document.getElementById('start-game-btn')
    };
    
    // Menu and modals
    this.elements.menu = {
      hamburgerBtn: document.getElementById('hamburger-btn'),
      floatingMenu: document.getElementById('floating-menu'),
      overlay: document.getElementById('overlay'),
      rulesModal: document.getElementById('rules-modal'),
      optionsModal: document.getElementById('options-modal'),
      errorModal: document.getElementById('error-modal'),
      errorMessage: document.getElementById('error-message')
    };
  },
  
  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Navigation buttons
    document.getElementById('new-game-menu-btn').addEventListener('click', () => UIController.showScreen('mainMenu'));
    document.getElementById('options-menu-btn').addEventListener('click', () => UIController.showModal('options'));
    document.getElementById('rules-menu-btn').addEventListener('click', () => UIController.showModal('rules'));
    document.getElementById('back-to-start-btn').addEventListener('click', () => UIController.showScreen('startMenu'));
    document.getElementById('back-to-modes-btn').addEventListener('click', () => UIController.showScreen('mainMenu'));
    
    // Game mode selection
    document.getElementById('classical-btn').addEventListener('click', () => GameController.setupPlayers(GameConfig.MODES.CLASSICAL));
    document.getElementById('competitive-btn').addEventListener('click', () => GameController.setupPlayers(GameConfig.MODES.COMPETITIVE));
    
    // Player setup
    this.elements.playerSetup.addBtn.addEventListener('click', PlayerManager.addPlayerInput);
    this.elements.playerSetup.startBtn.addEventListener('click', GameController.startGame);
    
    // Game play
    this.elements.gameBoard.submitBtn.addEventListener('click', GameController.submitRanking);
    this.elements.gameBoard.nextRoundBtn.addEventListener('click', GameController.startNewRound);
    document.getElementById('play-again-btn').addEventListener('click', GameController.resetGame);
    
    // Error modal
    document.getElementById('error-ok-btn').addEventListener('click', () => UIController.hideModal('error'));
    
    // Options
    document.getElementById('save-options-btn').addEventListener('click', () => {
      GameController.saveOptions();
      UIController.hideModal('options');
    });
  },
  
  /**
   * Set up player configuration for a game mode
   * @param {string} mode - Game mode ('classical' or 'competitive')
   */
  setupPlayers(mode) {
    GameState.gameMode = mode;
    UIController.showScreen('playerSetup');
    
    // Clear previous inputs
    this.elements.playerSetup.container.innerHTML = '';
    
    // Add initial player inputs
    const minPlayers = mode === GameConfig.MODES.CLASSICAL ? 
      GameConfig.DEFAULTS.MIN_PLAYERS.CLASSICAL : 
      GameConfig.DEFAULTS.MIN_PLAYERS.COMPETITIVE;
      
    for (let i = 0; i < minPlayers; i++) {
      PlayerManager.addPlayerInput();
    }
    
    console.log(`Player setup shown for ${mode} mode`);
  },
  
  /**
   * Start the game with current players
   */
  startGame() {
    // Get player names
    const playerNames = PlayerManager.getPlayerNames();
    
    // Validate player count
    if (!PlayerManager.validatePlayerCount(playerNames.length)) {
      return;
    }
    
    // Set players and reset game state
    GameState.players = playerNames;
    GameState.reset();
    
    // Reset score tracking
    GameController.lastScores = { team: 0, game: 0 };
    
    // Show game board
    UIController.showScreen('gameBoard');
    
    // Start first round
    GameController.prepareNewRound();
    
    console.log("Game started with players:", GameState.players);
  },
  
  /**
   * Save game options
   */
  saveOptions() {
    const roundsSelect = document.getElementById('rounds-select');
    GameState.totalRounds = parseInt(roundsSelect.value);
    UIController.updateRoundDisplay();
    
    console.log(`Game options updated: ${GameState.totalRounds} rounds`);
  },
  
  /**
   * Prepare for a new round
   */
  prepareNewRound() {
    console.log("Preparing new round");
    
    // Clear previous state
    GameState.subjectRanking = [];
    GameState.informantRanking = [];
    this.elements.gameBoard.scoreFeedback.style.display = 'none';
    
    // Update round counter
    GameState.currentRound++;
    
    // Check if game should end
    if (GameState.shouldEndGame()) {
      GameController.endGame();
      return;
    }
    
    // Update round indicator
    UIController.updateRoundDisplay();
    
    // Assign subject (rotate through players)
    GameState.currentSubject = GameState.players[(GameState.currentRound - 1) % GameState.players.length];
    
    // Draw random cards
    GameState.currentCards = getRandomCards(5);
    UIController.renderCards(GameState.currentCards);
    
    // Update display
    UIController.updateScoreDisplay();
    UIController.setGameStatus(`Subject (${GameState.currentSubject}) - Rank traits from most to least like you`);
    
    // Make sure ranking scale is visible during ranking phase
    this.elements.gameBoard.rankingScale.style.display = 'flex';
    
    // Show submit button, hide next round button
    this.elements.gameBoard.submitBtn.style.display = 'inline-block';
    this.elements.gameBoard.nextRoundBtn.style.display = 'none';
    
    console.log(`Round ${GameState.currentRound} started with subject: ${GameState.currentSubject}`);
  },
  
  /**
   * Start a new round (called by next round button)
   */
  startNewRound() {
    GameController.prepareNewRound();
  },
  
  /**
   * Submit current card ranking
   */
  submitRanking() {
    // Check that all cards are ranked
    const rankedCards = document.querySelectorAll('.trait-card .card-rank');
    if (rankedCards.length !== 5) {
      UIController.showError('Please rank all 5 traits before submitting');
      return;
    }
    
    // Get the current rankings
    const rankings = [];
    rankedCards.forEach(badge => {
      const card = badge.closest('.trait-card');
      rankings.push({
        id: parseInt(card.dataset.id),
        rank: parseInt(badge.textContent)
      });
    });
    
    // Sort by rank
    rankings.sort((a, b) => a.rank - b.rank);
    
    // Pull out just the IDs in order
    const orderedIds = rankings.map(item => item.id);
    
    const isSubjectPhase = GameState.subjectRanking.length === 0;
    console.log("Current phase:", isSubjectPhase ? "Subject" : "Informant");
    console.log("Rankings submitted:", orderedIds);
    
    // Check which phase we're in
    if (isSubjectPhase) {
      // Subject phase - store rankings and switch to informant phase
      GameState.subjectRanking = [...orderedIds]; // Make a copy of the array
      console.log("Saved subject ranking:", GameState.subjectRanking);
      
      // Reset cards for informants
      UIController.resetCardsForInformants();
      
      // Update status
      UIController.setGameStatus(`Informants - Predict how ${GameState.currentSubject} ranked the traits`);
    } else {
      // Informant phase - store rankings and compare
      GameState.informantRanking = [...orderedIds]; // Make a copy of the array
      console.log("Saved informant ranking:", GameState.informantRanking);
      
      // Compare and score
      GameController.compareRankings();
    }
  },
  
  /**
   * Compare rankings and calculate scores
   */
  compareRankings() {
    console.log("Comparing: Subject", GameState.subjectRanking, "Informant", GameState.informantRanking);
    
    // Store current scores before updating
    GameController.lastScores = {
      team: GameState.scores.team,
      game: GameState.scores.game
    };
    
    // Calculate points
    let matchPoints = 0;
    const matchDetails = [];
    
    for (let i = 0; i < 5; i++) {
      if (GameState.subjectRanking[i] === GameState.informantRanking[i]) {
        matchPoints += GameConfig.SCORING.EXACT_MATCH; // Exact match
        matchDetails.push(`Exact match at position ${i+1}: +${GameConfig.SCORING.EXACT_MATCH} points`);
      } else {
        // Check for adjacent ranking
        const subjectIndex = GameState.subjectRanking.indexOf(GameState.informantRanking[i]);
        if (Math.abs(subjectIndex - i) === 1) {
          matchPoints += GameConfig.SCORING.CLOSE_MATCH; // Off by one position
          matchDetails.push(`Close match at position ${i+1}: +${GameConfig.SCORING.CLOSE_MATCH} points`);
        } else {
          matchDetails.push(`No match at position ${i+1}: +0 points`);
        }
      }
    }
    
    // Update scores
    if (GameState.gameMode === GameConfig.MODES.CLASSICAL) {
      GameState.scores.team += matchPoints;
      GameState.scores.game += (GameConfig.SCORING.MAX_ROUND_POINTS - matchPoints);
    }
    
    // Show results
    UIController.setGameStatus(`Round ${GameState.currentRound} Complete`);
    
    // Update score display with new score changes
    UIController.updateScoreDisplay();
    
    // Show score feedback
    this.elements.gameBoard.pointsEarned.textContent = `Points earned: ${matchPoints}`;
    this.elements.gameBoard.matchDetails.innerHTML = matchDetails.join('<br>');
    this.elements.rounds.currentResults.textContent = GameState.currentRound;
    this.elements.rounds.totalResults.textContent = GameState.totalRounds;
    this.elements.gameBoard.scoreFeedback.style.display = 'block';
    
    // Make ranking scale visible again
    this.elements.gameBoard.rankingScale.style.display = 'flex';
    
    // Highlight and reorder matches
    UIController.highlightMatches();
    
    // Hide submit button, show next round button
    this.elements.gameBoard.submitBtn.style.display = 'none';
    this.elements.gameBoard.nextRoundBtn.style.display = 'inline-block';
    
    console.log(`Round completed. Points earned: ${matchPoints}`);
  },
  
  /**
   * End the game and show final results
   */
  endGame() {
    UIController.showScreen('endScreen');
    
    if (GameState.scores.team > GameState.scores.game) {
      document.getElementById('winner').textContent = 'Team Wins!';
    } else if (GameState.scores.team < GameState.scores.game) {
      document.getElementById('winner').textContent = 'Game Wins!';
    } else {
      document.getElementById('winner').textContent = 'It\'s a tie!';
    }
    
    // Create a styled final scoreboard
    const finalScoreboardHTML = `
      <div class="scoreboard">
        <div class="score-container team-score">
          <div class="score-label">Team</div>
          <div class="score-value">${GameState.scores.team}</div>
        </div>
        <div class="score-container game-score">
          <div class="score-label">Game</div>
          <div class="score-value">${GameState.scores.game}</div>
        </div>
      </div>
    `;
    
    document.getElementById('final-scores').innerHTML = finalScoreboardHTML;
    
    console.log("Game ended. Final scores:", GameState.scores);
  },
  
  /**
   * Reset game to start menu
   */
  resetGame() {
    // Show start menu
    UIController.showScreen('startMenu');
    
    // Reset game state
    GameState.reset();
    
    // Reset score tracking
    GameController.lastScores = { team: 0, game: 0 };
    
    // Reset round display
    UIController.updateRoundDisplay();
    
    console.log("Game reset");
  }
};

// Player Management
const PlayerManager = {
  /**
   * Add a player input field to the setup screen
   */
  addPlayerInput() {
    const container = GameController.elements.playerSetup.container;
    const playerCount = container.childElementCount + 1;
    
    const div = document.createElement('div');
    div.className = 'player-input';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Player ${playerCount}`;
    
    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-player-btn';
    removeBtn.innerHTML = '&times;'; // × symbol
    removeBtn.title = 'Remove player';
    removeBtn.addEventListener('click', function() {
      PlayerManager.removePlayerInput(div);
    });
    
    div.appendChild(input);
    div.appendChild(removeBtn);
    container.appendChild(div);
  },
  
  /**
   * Remove a player input field from the setup screen
   * @param {Element} playerInputDiv - The player input div to remove
   */
  removePlayerInput(playerInputDiv) {
    const container = GameController.elements.playerSetup.container;
    const minPlayers = GameState.getMinPlayers();
    
    // Check if we're at minimum players
    if (container.childElementCount <= minPlayers) {
      UIController.showError(`You need at least ${minPlayers} players for ${GameState.gameMode} mode`);
      return;
    }
    
    // Remove the player input
    container.removeChild(playerInputDiv);
    
    // Update the placeholder numbers for remaining inputs
    const inputs = container.querySelectorAll('.player-input input');
    inputs.forEach((input, index) => {
      input.placeholder = `Player ${index + 1}`;
    });
    
    console.log("Player input removed");
  },
  
  /**
   * Get player names from input fields
   * @returns {Array} Array of player names
   */
  getPlayerNames() {
    const players = [];
    const inputs = GameController.elements.playerSetup.container.querySelectorAll('.player-input input');
    
    inputs.forEach(input => {
      const name = input.value.trim() || input.placeholder;
      players.push(name);
    });
    
    return players;
  },
  
  /**
   * Validate that we have enough players for the game mode
   * @param {number} playerCount - Number of players
   * @returns {boolean} True if valid, false otherwise
   */
  validatePlayerCount(playerCount) {
    const minPlayers = GameState.getMinPlayers();
    
    if (playerCount < minPlayers) {
      UIController.showError(`You need at least ${minPlayers} players for ${GameState.gameMode} mode`);
      return false;
    }
    
    return true;
  }
};

// UI Controller
const UIController = {
  /**
   * Show a specific screen and hide others
   * @param {string} screenName - Name of the screen to show
   */
  showScreen(screenName) {
    // Hide all screens
    Object.values(GameController.elements.screens).forEach(screen => {
      screen.style.display = 'none';
    });
    
    // Show the requested screen
    GameController.elements.screens[screenName].style.display = 'block';
  },
  
  /**
   * Update the round indicator displays
   */
  updateRoundDisplay() {
    GameController.elements.rounds.current.textContent = GameState.currentRound || 1;
    GameController.elements.rounds.total.textContent = GameState.totalRounds;
    GameController.elements.rounds.totalResults.textContent = GameState.totalRounds;
  },
  
  /**
   * Update the score display with animated changes
   */
  updateScoreDisplay() {
    // Calculate score changes
    const teamChange = GameState.scores.team - GameController.lastScores.team;
    const gameChange = GameState.scores.game - GameController.lastScores.game;
    
    // Create scoreboard HTML if it doesn't exist
    if (!document.getElementById('scoreboard')) {
      const scoreboardHTML = `
        <div id="scoreboard" class="scoreboard">
          <div class="score-container team-score">
            <div class="score-label">Team</div>
            <div class="score-value" id="team-score-value">${GameState.scores.team}</div>
            ${teamChange > 0 ? `<div class="score-change">(+${teamChange})</div>` : ''}
          </div>
          <div class="score-container game-score">
            <div class="score-label">Game</div>
            <div class="score-value" id="game-score-value">${GameState.scores.game}</div>
            ${gameChange > 0 ? `<div class="score-change">(+${gameChange})</div>` : ''}
          </div>
        </div>
      `;
      
      // Insert scoreboard
      const scores = document.getElementById('scores');
      scores.innerHTML = scoreboardHTML;
    } else {
      // Update existing scoreboard
      document.getElementById('team-score-value').textContent = GameState.scores.team;
      document.getElementById('game-score-value').textContent = GameState.scores.game;
      
      // Add change indicators if there are changes
      const teamScoreContainer = document.querySelector('.team-score');
      const gameScoreContainer = document.querySelector('.game-score');
      
      // Remove previous change indicators
      const existingTeamChange = teamScoreContainer.querySelector('.score-change');
      const existingGameChange = gameScoreContainer.querySelector('.score-change');
      
      if (existingTeamChange) teamScoreContainer.removeChild(existingTeamChange);
      if (existingGameChange) gameScoreContainer.removeChild(existingGameChange);
      
      // Add new change indicators if there are changes
      if (teamChange > 0) {
        const teamChangeEl = document.createElement('div');
        teamChangeEl.className = 'score-change';
        teamChangeEl.textContent = `(+${teamChange})`;
        teamScoreContainer.appendChild(teamChangeEl);
      }
      
      if (gameChange > 0) {
        const gameChangeEl = document.createElement('div');
        gameChangeEl.className = 'score-change';
        gameChangeEl.textContent = `(+${gameChange})`;
        gameScoreContainer.appendChild(gameChangeEl);
      }
    }
    
    // Keep compatibility with old references
    GameController.elements.gameBoard.teamScore.textContent = GameState.scores.team;
    GameController.elements.gameBoard.gameScore.textContent = GameState.scores.game;
  },
  
  /**
   * Set the game status text
   * @param {string} text - Status text to display
   */
  setGameStatus(text) {
    GameController.elements.gameBoard.gameStatus.textContent = text;
  },
  
  /**
   * Show error modal with message
   * @param {string} message - Error message to display
   */
  showError(message) {
    GameController.elements.menu.errorMessage.textContent = message;
    UIController.showModal('error');
  },
  
  /**
   * Show a modal and the overlay
   * @param {string} modalName - Name of the modal to show ('rules', 'options', 'error')
   */
  showModal(modalName) {
    const modalMap = {
      'rules': GameController.elements.menu.rulesModal,
      'options': GameController.elements.menu.optionsModal,
      'error': GameController.elements.menu.errorModal
    };
    
    GameController.elements.menu.overlay.classList.add('show');
    modalMap[modalName].classList.add('show');
  },
  
  /**
   * Hide a specific modal
   * @param {string} modalName - Name of the modal to hide
   */
  hideModal(modalName) {
    const modalMap = {
      'rules': GameController.elements.menu.rulesModal,
      'options': GameController.elements.menu.optionsModal,
      'error': GameController.elements.menu.errorModal
    };
    
    modalMap[modalName].classList.remove('show');
    GameController.elements.menu.overlay.classList.remove('show');
  },
  
  /**
   * Hide all modals and overlay
   */
  hideAllModals() {
    GameController.elements.menu.rulesModal.classList.remove('show');
    GameController.elements.menu.optionsModal.classList.remove('show');
    GameController.elements.menu.errorModal.classList.remove('show');
    GameController.elements.menu.overlay.classList.remove('show');
  },
  
  /**
   * Initialize the hamburger menu and all related UI components
   */
  initMenu() {
    const hamburgerBtn = GameController.elements.menu.hamburgerBtn;
    const floatingMenu = GameController.elements.menu.floatingMenu;
    
    // Hamburger button toggle
    hamburgerBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      floatingMenu.classList.toggle('show');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!hamburgerBtn.contains(event.target) && 
          !floatingMenu.contains(event.target) &&
          floatingMenu.classList.contains('show')) {
        hamburgerBtn.classList.remove('active');
        floatingMenu.classList.remove('show');
      }
    });
    
    // Menu options
    document.getElementById('new-game-btn').addEventListener('click', function() {
      GameController.resetGame();
      hamburgerBtn.classList.remove('active');
      floatingMenu.classList.remove('show');
    });
    
    document.getElementById('options-btn').addEventListener('click', function() {
      UIController.showModal('options');
      hamburgerBtn.classList.remove('active');
      floatingMenu.classList.remove('show');
    });
    
    document.getElementById('rules-btn').addEventListener('click', function() {
      UIController.showModal('rules');
      hamburgerBtn.classList.remove('active');
      floatingMenu.classList.remove('show');
    });
    
    // Close buttons for modals
    document.getElementById('close-menu-btn').addEventListener('click', function() {
      hamburgerBtn.classList.remove('active');
      floatingMenu.classList.remove('show');
    });
    
    document.getElementById('close-rules-btn').addEventListener('click', function() {
      UIController.hideModal('rules');
    });
    
    document.getElementById('close-options-btn').addEventListener('click', function() {
      UIController.hideModal('options');
    });
    
    // Overlay click to close modals
    GameController.elements.menu.overlay.addEventListener('click', function() {
      UIController.hideAllModals();
    });
  },
  
  /**
   * Render cards to the game board
   * @param {Array} cards - Array of card objects to render
   */
  renderCards(cards) {
    const cardsContainer = GameController.elements.gameBoard.cardsContainer;
    
    // Clear container
    cardsContainer.innerHTML = '';
    
    // Create and add card elements
    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'trait-card';
      cardElement.dataset.id = card.id;
      cardElement.innerHTML = `
        <h3>${card.name}</h3>
        <p>${card.description}</p>
      `;
      
      // Add click handler for ranking
      cardElement.addEventListener('click', function() {
        UIController.toggleCardRank(this);
      });
      
      cardsContainer.appendChild(cardElement);
    });
    
    console.log("Rendered cards:", cards.map(c => c.name));
  },
  
  /**
   * Toggle rank on a card when clicked
   * @param {Element} cardElement - The clicked card element
   */
  toggleCardRank(cardElement) {
    // Count existing ranked cards
    const rankedCards = document.querySelectorAll('.trait-card .card-rank');
    
    // If this card already has a rank, remove it
    const existingRank = cardElement.querySelector('.card-rank');
    if (existingRank) {
      const oldRank = parseInt(existingRank.textContent);
      existingRank.remove();
      
      // Adjust other ranks
      document.querySelectorAll('.trait-card .card-rank').forEach(badge => {
        const rank = parseInt(badge.textContent);
        if (rank > oldRank) {
          badge.textContent = rank - 1;
        }
      });
      
      return;
    }
    
    // Only allow 5 rankings
    if (rankedCards.length >= 5) return;
    
    // Add a new rank
    const newRank = rankedCards.length + 1;
    const rankBadge = document.createElement('div');
    rankBadge.className = 'card-rank';
    rankBadge.textContent = newRank;
    cardElement.appendChild(rankBadge);
  },
  
  /**
   * Reset cards for informants turn
   */
  resetCardsForInformants() {
    // Remove all rank badges
    document.querySelectorAll('.card-rank').forEach(badge => badge.remove());
    
    // Shuffle card order
    const cards = Array.from(GameController.elements.gameBoard.cardsContainer.children);
    cards.sort(() => 0.5 - Math.random()).forEach(card => {
      GameController.elements.gameBoard.cardsContainer.appendChild(card);
    });
    
    console.log("Cards reset for informants");
  },
  
  /**
   * Highlights matching and mismatching cards and reorders them based on subject's ranking
   */
  highlightMatches() {
    const cardsContainer = GameController.elements.gameBoard.cardsContainer;
    const cards = Array.from(document.querySelectorAll('.trait-card'));
    
    // Clear the container first
    cardsContainer.innerHTML = '';
    
    // Create array to hold ordered cards
    const orderedCards = [];
    
    // For each position in the subject's ranking
    for (let i = 0; i < GameState.subjectRanking.length; i++) {
      const cardId = GameState.subjectRanking[i];
      // Find the corresponding card element
      const card = cards.find(card => parseInt(card.dataset.id) === cardId);
      
      if (card) {
        // Clone the card to avoid reference issues
        const cardClone = card.cloneNode(true);
        
        // Remove any existing rank badges
        const existingRank = cardClone.querySelector('.card-rank');
        if (existingRank) {
          existingRank.remove();
        }
        
        // Get the informant's ranking position for this card
        const informantPosition = GameState.informantRanking.indexOf(cardId);
        
        // Style based on match accuracy
        if (i === informantPosition) {
          // Exact match
          cardClone.style.border = '2px solid green';
          cardClone.style.backgroundColor = '#e8f5e9';
        } else if (Math.abs(i - informantPosition) === 1) {
          // Close match
          cardClone.style.border = '2px solid orange';
          cardClone.style.backgroundColor = '#fff8e1';
        } else {
          // No match
          cardClone.style.border = '2px solid red';
          cardClone.style.backgroundColor = '#ffebee';
        }
        
        orderedCards.push(cardClone);
      }
    }
    
    // Add all cards to the container in the correct order
    orderedCards.forEach(card => {
      cardsContainer.appendChild(card);
    });
  }
};

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  GameController.init();
});