# Reputations Game: Feature Integration Plan

This document outlines a plan for incrementally adding features to the basic working version of the Reputations game. Each feature is described with implementation details and potential challenges.

## Core Working Version

The current working version includes:
- Basic game flow (subject/informant phases)
- Simple card ranking system
- Score calculation
- Manual round advancement

## Feature 1: Enhanced Card Design

**Branch name:** `feature/enhanced-cards`

**Description:** Improve the visual appeal and functionality of trait cards.

**Implementation steps:**
1. Add card flipping animation to reveal examples on the back
2. Improve card styling with better typography and shadows
3. Add trait icons to cards
4. Make rank badges more visually appealing

**Code to modify:**
- CSS styling for trait cards
- Card creation function
- Click handlers for card interaction

**Example code for card flipping:**
```javascript
// Add to CSS
.trait-card {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}
.trait-card.flipped {
    transform: rotateY(180deg);
}
.card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}
.card-back {
    transform: rotateY(180deg);
}

// Add to JS card creation
cardElement.addEventListener('click', function(e) {
    // Don't flip if clicking on rank badge
    if (!e.target.closest('.card-rank')) {
        this.classList.toggle('flipped');
    }
});
```

## Feature 2: Drag and Drop Card Ranking

**Branch name:** `feature/drag-drop`

**Description:** Allow players to drag and drop cards to rank them instead of just clicking.

**Implementation steps:**
1. Add HTML5 drag and drop functionality
2. Create visual cues for drag operations
3. Ensure mobile compatibility with touch events
4. Maintain click-to-rank as fallback

**Code to modify:**
- Card creation function
- Add drag event handlers
- Update ranking mechanism

**Example code:**
```javascript
// Add these to the card element creation
cardElement.draggable = true;
cardElement.addEventListener('dragstart', handleDragStart);
cardElement.addEventListener('dragover', handleDragOver);
cardElement.addEventListener('drop', handleDrop);
cardElement.addEventListener('dragend', handleDragEnd);

// Implement drag handlers
function handleDragStart(e) {
    draggedCard = this;
    this.style.opacity = '0.4';
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();
    
    if (draggedCard !== this) {
        // Reorder cards
        const container = cardsContainer;
        const cards = Array.from(container.children);
        const draggedIndex = cards.indexOf(draggedCard);
        const targetIndex = cards.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            container.insertBefore(draggedCard, this.nextSibling);
        } else {
            container.insertBefore(draggedCard, this);
        }
        
        // Update rankings
        updateCardRanks();
    }
    
    return false;
}
```

## Feature 3: Player Management System

**Branch name:** `feature/player-management`

**Description:** Add proper player management with avatars and role indicators.

**Implementation steps:**
1. Create player avatar display
2. Add visual indicator for current subject
3. Implement player role management (subject/informant)
4. Add player name input validation

**Code to modify:**
- HTML for player display area
- Player setup functions
- Round management

**Example implementation:**
```javascript
function createPlayerAvatars() {
    const playerDisplay = document.getElementById('player-display');
    playerDisplay.innerHTML = '';
    
    players.forEach(player => {
        const avatar = document.createElement('div');
        avatar.className = 'player-avatar';
        avatar.dataset.player = player;
        avatar.textContent = player.charAt(0).toUpperCase();
        
        if (player === currentSubject) {
            avatar.classList.add('subject');
        } else {
            avatar.classList.add('informant');
        }
        
        playerDisplay.appendChild(avatar);
    });
}
```

## Feature 4: Round Progress Visualization

**Branch name:** `feature/round-progress`

**Description:** Add visual indicators for game progress.

**Implementation steps:**
1. Create round indicator dots/progress bar
2. Add animations for round transitions
3. Improve round completion feedback
4. Include game completion percentage

**Example implementation:**
```javascript
function updateRoundIndicators() {
    const indicatorsContainer = document.getElementById('round-indicators');
    indicatorsContainer.innerHTML = '';
    
    for (let i = 1; i <= totalRounds; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'round-indicator';
        
        if