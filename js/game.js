/**
 * Reputations Game - Game Logic Module
 * Contains all game functionality and event handling.
 */

// DOM elements
const startMenu = document.getElementById('start-menu');
const mainMenu = document.getElementById('main-menu');
const playerSetup = document.getElementById('player-setup');
const gameBoard = document.getElementById('game-board');
const endScreen = document.getElementById('end-screen');
const cardsContainer = document.getElementById('cards-container');
const gameStatus = document.getElementById('game-status');
const submitBtn = document.getElementById('submit-btn');
const nextRoundBtn = document.getElementById('next-round-btn');
const scoreFeedback = document.getElementById('score-feedback');
const hamburgerBtn = document.getElementById('hamburger-btn');
const floatingMenu = document.getElementById('floating-menu');
const overlay = document.getElementById('overlay');
const rulesModal = document.getElementById('rules-modal');
const optionsModal = document.getElementById('options-modal');
const errorModal = document.getElementById('error-modal');
const errorMessage = document.getElementById('error-message');
const currentRoundDisplay = document.getElementById('current-round');
const totalRoundsDisplay = document.getElementById('total-rounds');

// Game variables
let gameMode = 'classical'; // classical or competitive
let players = [];
let currentSubject = '';
let currentRound = 0;
let totalRounds = 5; // Default value
let currentCards = [];
let subjectRanking = [];
let informantRanking = [];
let scores = { team: 0, game: 0 };

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    // Start Menu navigation
    document.getElementById('new-game-menu-btn').addEventListener('click', function() {
        showScreen(mainMenu);
    });
    
    document.getElementById('options-menu-btn').addEventListener('click', function() {
        showModal(optionsModal);
    });
    
    document.getElementById('rules-menu-btn').addEventListener('click', function() {
        showModal(rulesModal);
    });
    
    // Back buttons
    document.getElementById('back-to-start-btn').addEventListener('click', function() {
        showScreen(startMenu);
    });
    
    document.getElementById('back-to-modes-btn').addEventListener('click', function() {
        showScreen(mainMenu);
    });
    
    // Mode selection
    document.getElementById('classical-btn').addEventListener('click', function() {
        showPlayerSetup('classical');
    });
    
    document.getElementById('competitive-btn').addEventListener('click', function() {
        showPlayerSetup('competitive');
    });
    
    // Player setup
    document.getElementById('add-player-btn').addEventListener('click', addPlayerInput);
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    
    // Game play
    submitBtn.addEventListener('click', submitRanking);
    nextRoundBtn.addEventListener('click', startNewRound);
    document.getElementById('play-again-btn').addEventListener('click', resetGame);
    
    // Error modal
    document.getElementById('error-ok-btn').addEventListener('click', function() {
        hideModal(errorModal);
    });
    
    // Set initial total rounds display
    totalRoundsDisplay.textContent = totalRounds;
    
    // Hamburger menu and floating menu
    initializeMenu();
    
    console.log("Game initialized");
});

/**
 * Custom alert function that uses our styled modal
 * @param {string} message - The message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    showModal(errorModal);
}

/**
 * Helper function to show a specific screen and hide others
 * @param {Element} screenToShow - The screen element to display
 */
function showScreen(screenToShow) {
    // Hide all screens
    startMenu.style.display = 'none';
    mainMenu.style.display = 'none';
    playerSetup.style.display = 'none';
    gameBoard.style.display = 'none';
    endScreen.style.display = 'none';
    
    // Show the requested screen
    screenToShow.style.display = 'block';
}

/**
 * Initializes the hamburger menu and all related UI components
 */
function initializeMenu() {
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
        resetGame();
        hamburgerBtn.classList.remove('active');
        floatingMenu.classList.remove('show');
    });
    
    document.getElementById('options-btn').addEventListener('click', function() {
        showModal(optionsModal);
        hamburgerBtn.classList.remove('active');
        floatingMenu.classList.remove('show');
    });
    
    document.getElementById('rules-btn').addEventListener('click', function() {
        showModal(rulesModal);
        hamburgerBtn.classList.remove('active');
        floatingMenu.classList.remove('show');
    });
    
    // Close buttons for modals
    document.getElementById('close-menu-btn').addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        floatingMenu.classList.remove('show');
    });
    
    document.getElementById('close-rules-btn').addEventListener('click', function() {
        hideModal(rulesModal);
    });
    
    document.getElementById('close-options-btn').addEventListener('click', function() {
        hideModal(optionsModal);
    });
    
    // Overlay click to close modals
    overlay.addEventListener('click', function() {
        hideAllModals();
    });
    
    // Save options
    document.getElementById('save-options-btn').addEventListener('click', function() {
        saveOptions();
        hideModal(optionsModal);
    });
}

/**
 * Shows a modal and the overlay
 * @param {Element} modal - The modal element to show
 */
function showModal(modal) {
    overlay.classList.add('show');
    modal.classList.add('show');
}

/**
 * Hides a specific modal
 * @param {Element} modal - The modal element to hide
 */
function hideModal(modal) {
    modal.classList.remove('show');
    overlay.classList.remove('show');
}

/**
 * Hides all modals and overlay
 */
function hideAllModals() {
    rulesModal.classList.remove('show');
    optionsModal.classList.remove('show');
    errorModal.classList.remove('show');
    overlay.classList.remove('show');
}

/**
 * Saves game options
 */
function saveOptions() {
    const roundsSelect = document.getElementById('rounds-select');
    totalRounds = parseInt(roundsSelect.value);
    totalRoundsDisplay.textContent = totalRounds;
    
    console.log(`Game options updated: ${totalRounds} rounds`);
}

/**
 * Shows the player setup screen for the selected game mode
 * @param {string} mode - Game mode ('classical' or 'competitive')
 */
function showPlayerSetup(mode) {
    gameMode = mode;
    showScreen(playerSetup);
    
    // Clear previous inputs
    document.getElementById('player-inputs').innerHTML = '';
    
    // Add initial player inputs
    const minPlayers = (mode === 'classical') ? 2 : 3;
    for (let i = 0; i < minPlayers; i++) {
        addPlayerInput();
    }
    
    console.log(`Player setup shown for ${mode} mode`);
}

/**
 * Adds a player input field to the setup screen
 */
function addPlayerInput() {
    const container = document.getElementById('player-inputs');
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
        removePlayerInput(div);
    });
    
    div.appendChild(input);
    div.appendChild(removeBtn);
    container.appendChild(div);
}

/**
 * Removes a player input field from the setup screen
 * @param {Element} playerInputDiv - The player input div to remove
 */
function removePlayerInput(playerInputDiv) {
    const container = document.getElementById('player-inputs');
    const minPlayers = (gameMode === 'classical') ? 2 : 3;
    
    // Check if we're at minimum players
    if (container.childElementCount <= minPlayers) {
        showError(`You need at least ${minPlayers} players for ${gameMode} mode`);
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
}

/**
 * Starts the game after player setup
 */
function startGame() {
    // Get player names
    players = [];
    const inputs = document.querySelectorAll('.player-input input');
    inputs.forEach(input => {
        const name = input.value.trim() || input.placeholder;
        players.push(name);
    });
    
    // Check minimum players
    const minPlayers = (gameMode === 'classical') ? 2 : 3;
    if (players.length < minPlayers) {
        showError(`You need at least ${minPlayers} players for ${gameMode} mode`);
        return;
    }
    
    // Reset game state
    currentRound = 0;
    scores = { team: 0, game: 0 };
    
    // Show game board
    showScreen(gameBoard);
    
    // Start first round
    prepareNewRound();
    
    console.log("Game started with players:", players);
}

/**
 * Updates the round indicator text
 */
function updateRoundIndicator() {
    currentRoundDisplay.textContent = currentRound;
    totalRoundsDisplay.textContent = totalRounds;
}

/**
 * Prepares for a new round
 */
function prepareNewRound() {
    console.log("Preparing new round");
    
    // Clear previous state
    subjectRanking = [];
    informantRanking = [];
    scoreFeedback.style.display = 'none';
    
    // Update round counter
    currentRound++;
    
    // Check if game should end
    if (currentRound > totalRounds) {
        endGame();
        return;
    }
    
    // Update round indicator
    updateRoundIndicator();
    
    // Assign subject (rotate through players)
    currentSubject = players[(currentRound - 1) % players.length];
    
    // Draw random cards
    drawCards();
    
    // Update display
    document.getElementById('team-score').textContent = scores.team;
    document.getElementById('game-score').textContent = scores.game;
    gameStatus.textContent = `Subject (${currentSubject}) - Rank traits from most to least like you`;
    
    // Make sure ranking scale is visible during ranking phase
    document.querySelector('.ranking-scale').style.display = 'flex';
    
    // Show submit button, hide next round button
    submitBtn.style.display = 'inline-block';
    nextRoundBtn.style.display = 'none';
    
    console.log(`Round ${currentRound} started with subject: ${currentSubject}`);
}

/**
 * Starts a new round (called by next round button)
 */
function startNewRound() {
    prepareNewRound();
}

/**
 * Draws random trait cards
 */
function drawCards() {
    // Clear container
    cardsContainer.innerHTML = '';
    
    // Select 5 random cards
    const shuffled = [...traitCards].sort(() => 0.5 - Math.random());
    currentCards = shuffled.slice(0, 5);
    
    // Create and add card elements
    currentCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'trait-card';
        cardElement.dataset.id = card.id;
        cardElement.innerHTML = `
            <h3>${card.name}</h3>
            <p>${card.description}</p>
        `;
        
        // Add click handler for ranking
        cardElement.addEventListener('click', function() {
            toggleCardRank(this);
        });
        
        cardsContainer.appendChild(cardElement);
    });
    
    console.log("Drew cards:", currentCards.map(c => c.name));
}

/**
 * Toggles rank on a card when clicked
 * @param {Element} cardElement - The clicked card element
 */
function toggleCardRank(cardElement) {
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
}

/**
 * Submits current card ranking
 */
function submitRanking() {
    // Check that all cards are ranked
    const rankedCards = document.querySelectorAll('.trait-card .card-rank');
    if (rankedCards.length !== 5) {
        showError('Please rank all 5 traits before submitting');
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
    
    console.log("Current phase:", subjectRanking.length === 0 ? "Subject" : "Informant");
    console.log("Rankings submitted:", orderedIds);
    
    // Check which phase we're in
    if (subjectRanking.length === 0) {
        // Subject phase - store rankings and switch to informant phase
        subjectRanking = [...orderedIds]; // Make a copy of the array
        console.log("Saved subject ranking:", subjectRanking);
        
        // Reset cards for informants
        resetCardsForInformants();
        
        // Update status
        gameStatus.textContent = `Informants - Predict how ${currentSubject} ranked the traits`;
    } else {
        // Informant phase - store rankings and compare
        informantRanking = [...orderedIds]; // Make a copy of the array
        console.log("Saved informant ranking:", informantRanking);
        
        // Compare and score
        compareRankings();
    }
}

/**
 * Resets cards for informants turn
 */
function resetCardsForInformants() {
    // Remove all rank badges
    document.querySelectorAll('.card-rank').forEach(badge => badge.remove());
    
    // Shuffle card order
    const cards = Array.from(cardsContainer.children);
    cards.sort(() => 0.5 - Math.random()).forEach(card => {
        cardsContainer.appendChild(card);
    });
    
    console.log("Cards reset for informants");
}

/**
 * Compares rankings and calculates scores
 */
function compareRankings() {
    console.log("Comparing: Subject", subjectRanking, "Informant", informantRanking);
    
    // Calculate points
    let matchPoints = 0;
    const matchDetails = [];
    
    for (let i = 0; i < 5; i++) {
        if (subjectRanking[i] === informantRanking[i]) {
            matchPoints += 10; // Exact match
            matchDetails.push(`Exact match at position ${i+1}: +10 points`);
        } else {
            // Check for adjacent ranking
            const subjectIndex = subjectRanking.indexOf(informantRanking[i]);
            if (Math.abs(subjectIndex - i) === 1) {
                matchPoints += 5; // Off by one position
                matchDetails.push(`Close match at position ${i+1}: +5 points`);
            } else {
                matchDetails.push(`No match at position ${i+1}: +0 points`);
            }
        }
    }
    
    // Update scores
    if (gameMode === 'classical') {
        scores.team += matchPoints;
        scores.game += (50 - matchPoints); // Max possible is 50
    }
    
    // Show results
    gameStatus.textContent = `Round ${currentRound} Complete`;
    document.getElementById('team-score').textContent = scores.team;
    document.getElementById('game-score').textContent = scores.game;
    
    // Show score feedback
    document.getElementById('points-earned').textContent = `Points earned: ${matchPoints}`;
    document.getElementById('match-details').innerHTML = matchDetails.join('<br>');
    document.getElementById('current-round-results').textContent = currentRound;
    document.getElementById('total-rounds-results').textContent = totalRounds;
    scoreFeedback.style.display = 'block';
    
    // Make ranking scale visible again
    document.querySelector('.ranking-scale').style.display = 'flex';
    
    // Highlight and reorder matches
    highlightMatches();
    
    // Hide submit button, show next round button
    submitBtn.style.display = 'none';
    nextRoundBtn.style.display = 'inline-block';
    
    console.log(`Round completed. Points earned: ${matchPoints}`);
}

/**
 * Highlights matching and mismatching cards and reorders them based on subject's ranking
 */
function highlightMatches() {
    const cardsContainer = document.getElementById('cards-container');
    const cards = Array.from(document.querySelectorAll('.trait-card'));
    
    // Clear the container first
    cardsContainer.innerHTML = '';
    
    // Create array to hold ordered cards
    const orderedCards = [];
    
    // For each position in the subject's ranking
    for (let i = 0; i < subjectRanking.length; i++) {
        const cardId = subjectRanking[i];
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
            const informantPosition = informantRanking.indexOf(cardId);
            
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

/**
 * Ends the game and shows final results
 */
function endGame() {
    showScreen(endScreen);
    
    if (scores.team > scores.game) {
        document.getElementById('winner').textContent = 'Team Wins!';
    } else if (scores.team < scores.game) {
        document.getElementById('winner').textContent = 'Game Wins!';
    } else {
        document.getElementById('winner').textContent = 'It\'s a tie!';
    }
    
    document.getElementById('final-scores').textContent = 
        `Final Score - Team: ${scores.team} | Game: ${scores.game}`;
    
    console.log("Game ended. Final scores:", scores);
}

/**
 * Resets game to start menu
 */
function resetGame() {
    // Show start menu
    showScreen(startMenu);
    
    // Reset variables
    subjectRanking = [];
    informantRanking = [];
    scores = { team: 0, game: 0 };
    currentRound = 0;
    
    // Reset round display
    currentRoundDisplay.textContent = '1';
    totalRoundsDisplay.textContent = totalRounds;
    
    console.log("Game reset");
}