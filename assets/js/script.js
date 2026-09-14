// ==========================================================================
// SCRIPT.JS: Master Game Engine for Premier League Recall
// --------------------------------------------------------------------------
// This file controls all interactive logic:
//   1. DOM Content Loaded & State Initialization
//   2. Fisher-Yates Random Shuffling (No repeat seasons until all are played)
//   3. Text Normalization (Handles accents like 'Solskjær' & 'Agüero')
//   4. Dynamic Card Creation & Insertion into the HTML Grid
//   5. Guess Validation & Dynamic Tie Claiming (Card #5 logic)
//   6. Scoring, Strikes (Sets), Hints, and Round End Transitions
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. STATE MANAGEMENT (The Variables Tracking Game Progress)
  // ------------------------------------------------------------------------
  let seasonQueue = [];       // Holds shuffled seasons waiting to be played
  let currentSeason = null;   // The specific season object active right now
  let activeSlots = [];       // Mutable copy of the 5 cards for the current round
  let score = 0;              // Total running player score
  let strikes = new Set();    // Set of unique wrong guesses (prevents duplicate strikes)
  let roundNumber = 1;        // Current round counter
  const MAX_STRIKES = 3;      // Strike allowance per round before game over

  // ------------------------------------------------------------------------
  // 2. DOM ELEMENT SELECTORS (Caching HTML Elements for Fast Access)
  // ------------------------------------------------------------------------
  const scoreDisplay = document.getElementById("current-score");
  const strikeDisplay = document.getElementById("strike-display");
  const roundDisplay = document.getElementById("round-counter");
  const seasonText = document.getElementById("season-text");
  const guessForm = document.getElementById("guess-form");
  const guessInput = document.getElementById("guess-input");
  const submitBtn = document.getElementById("submit-guess-btn");
  const feedbackMsg = document.getElementById("feedback-message");
  const slotsContainer = document.getElementById("slots-container");
  const nextRoundBtn = document.getElementById("next-round-btn");

  // Dynamically ensure the "Reveal All" button exists right next to the "Next Season" button
  let revealAllBtn = document.getElementById("reveal-all-btn");
  if (!revealAllBtn && nextRoundBtn) {
    revealAllBtn = document.createElement("button");
    revealAllBtn.id = "reveal-all-btn";
    revealAllBtn.type = "button";
    revealAllBtn.className = "btn btn-outline-danger px-4 py-2 fw-semibold me-2";
    revealAllBtn.textContent = "Reveal All";
    nextRoundBtn.parentNode.insertBefore(revealAllBtn, nextRoundBtn);
  }

  // ------------------------------------------------------------------------
  // 3. HELPER FUNCTIONS: Shuffling, Normalization & Live Feedback
  // ------------------------------------------------------------------------

  // Fisher-Yates Algorithm: Mathematically guarantees an unbiased random order
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
  }

  // Text Sanitizer:
  // Strips accents and punctuation so "Solskjær" matches "solskjaer",
  // and "Mo Salah" or "Salah " matches "salah".
  function sanitizeInput(str) {
    return str
      .trim()
      .toLowerCase()
      .normalize("NFD")                 // Decomposes accented letters (e.g., 'é' -> 'e' + accent mark)
      .replace(/[\u0300-\u036f]/g, "") // Removes the accent mark characters
      .replace(/[^a-z0-9]/g, "");       // Removes all spaces, dashes, and special characters
  }

  // Updates the live feedback banner under the input form
  function announceFeedback(message, statusClass = "feedback-warning") {
    feedbackMsg.className = `py-2 mb-0 fw-bold ${statusClass}`;
    feedbackMsg.textContent = message;
    feedbackMsg.classList.remove("d-none");
  }

  // ------------------------------------------------------------------------
  // 4. ROUND INITIALIZATION & RENDERING
  // ------------------------------------------------------------------------

  // First-time startup: validates that data.js loaded properly, then shuffles
  function initGame() {
    if (!Array.isArray(seasonsData) || seasonsData.length === 0) {
      announceFeedback("Error: Season data failed to load.", "feedback-error");
      return;
    }
    seasonQueue = shuffle(seasonsData);
    loadSeason();
  }

  // Prepares a new round with the next random season
  function loadSeason() {
    // If we've played through all 34 seasons, reshuffle the full deck
    if (seasonQueue.length === 0) {
      seasonQueue = shuffle(seasonsData);
    }

    currentSeason = seasonQueue.pop(); // Take the next season from our queue
    strikes.clear();                   // Reset strikes for the new round
    updateDashboard();

    // Create an active copy of the 5 cards to track solved states during the round
    activeSlots = currentSeason.topScorers.map((slot) => ({
      ...slot,
      revealed: false,
      hintUsed: false,
      selectedPlayer: null
    }));

    // Update UI elements for the new season
    seasonText.textContent = `${currentSeason.season} Season`;
    feedbackMsg.classList.add("d-none");
    if (nextRoundBtn) nextRoundBtn.classList.add("d-none");
    if (revealAllBtn) revealAllBtn.classList.remove("d-none");

    // Re-enable and focus the input form
    guessInput.disabled = false;
    submitBtn.disabled = false;
    guessInput.value = "";
    guessInput.focus();

    renderCards();
  }

  // Builds and injects the 5 player cards into #slots-container
  function renderCards() {
    slotsContainer.innerHTML = ""; // Clear out previous cards

    activeSlots.forEach((slot, index) => {
      // Responsive column container (1 col on mobile, up to 5 on large screens)
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg";

      // The Card box matching style.css (.slot-card)
      const card = document.createElement("div");
      card.id = `card-${index}`;
      card.className = "slot-card d-flex flex-column justify-content-between p-3 h-100";

      card.innerHTML = `
        <!-- Top row: Rank badge circle and goal count -->
        <div class="d-flex align-items-center justify-content-between mb-2">
          <div class="rank-badge rounded-circle d-flex align-items-center justify-content-center fw-bold">
            #${slot.rank}
          </div>
          <span class="badge bg-dark border border-secondary text-light-subtle">${slot.goals} Goals</span>
        </div>
        
        <!-- Center content: Mystery question marks until guessed -->
        <div class="card-content py-1">
          <div class="player-name fw-bold text-light-subtle letter-spacing">? ? ? ? ?</div>
          <div class="player-meta small text-muted"></div>
        </div>
        
        <!-- Bottom row: Hint button or revealed club hint -->
        <div class="hint-container d-flex align-items-center justify-content-between mt-2 pt-2 border-top border-secondary border-opacity-25">
          <button type="button" class="btn btn-sm btn-outline-warning btn-hint" onclick="window.revealSlotHint(${index})">Hint (-5 pts)</button>
          <span id="hint-text-${index}" class="small text-warning fw-semibold d-none"></span>
        </div>
      `;

      col.appendChild(card);
      slotsContainer.appendChild(col);
    });
  }

  // ------------------------------------------------------------------------
  // 5. HINT SYSTEM
  // ------------------------------------------------------------------------

  // Reveals the player's club(s) when the Hint button on a card is pressed
  window.revealSlotHint = function (index) {
    const slot = activeSlots[index];
    if (slot.revealed || slot.hintUsed) return; // Prevent clicking twice

    slot.hintUsed = true; // Marks hint as used so it awards 5 pts instead of 10
    const card = document.getElementById(`card-${index}`);
    const hintBtn = card.querySelector(".btn-hint");
    const hintText = document.getElementById(`hint-text-${index}`);

    // Hide button and show the club text
    hintBtn.classList.add("d-none");
    hintText.textContent = slot.isTied ? `Clubs: ${slot.club}` : `Club: ${slot.club}`;
    hintText.classList.remove("d-none");

    announceFeedback(`Hint for #${slot.rank}: ${hintText.textContent}`, "feedback-warning");
  };

  // ------------------------------------------------------------------------
  // 6. GUESS PROCESSING & CARD MATCHING LOGIC
  // ------------------------------------------------------------------------

  function processGuess(e) {
    e.preventDefault(); // Prevents page reload on form submit
    const rawInput = guessInput.value;
    const cleanGuess = sanitizeInput(rawInput);

    if (!cleanGuess) return;
    guessInput.value = ""; // Clear input for next guess

    let matchedIndex = -1;
    let winningPlayer = null;

    // Loop through the 5 cards to see if any unsolved card matches the guess
    for (let i = 0; i < activeSlots.length; i++) {
      const slot = activeSlots[i];
      if (slot.revealed) continue; // Skip already solved cards

      if (slot.isTied) {
        // CARD #5 TIE LOGIC: Look inside the tiedOptions array
        const found = slot.tiedOptions.find((candidate) => {
          const nameMatch = sanitizeInput(candidate.name) === cleanGuess;
          const aliasMatch = candidate.aliases.some((alias) => sanitizeInput(alias) === cleanGuess);
          return nameMatch || aliasMatch;
        });

        if (found) {
          // Verify this specific player hasn't already been claimed
          const alreadyClaimed = activeSlots.some(
            (s) => s.revealed && s.selectedPlayer && s.selectedPlayer.name === found.name
          );

          if (!alreadyClaimed) {
            matchedIndex = i;
            winningPlayer = found;
            break;
          }
        }
      } else {
        // STANDARD CARD LOGIC: Check single player name and aliases
        const nameMatch = sanitizeInput(slot.name) === cleanGuess;
        const aliasMatch = slot.aliases.some((alias) => sanitizeInput(alias) === cleanGuess);

        if (nameMatch || aliasMatch) {
          matchedIndex = i;
          winningPlayer = slot;
          break;
        }
      }
    }

    // Deliver verdict: correct guess or strike
    if (matchedIndex !== -1) {
      revealSuccess(matchedIndex, winningPlayer);
    } else {
      handleStrike(rawInput, cleanGuess);
    }
  }

  // Handles correct answers: awards points and turns card green
  function revealSuccess(index, player) {
    const slot = activeSlots[index];
    slot.revealed = true;
    slot.selectedPlayer = player;

    // 10 points base, 5 points if hint was already used
    const pointsAwarded = slot.hintUsed ? 5 : 10;
    score += pointsAwarded;

    // Turn card neon-green using .revealed class from style.css
    const card = document.getElementById(`card-${index}`);
    card.classList.add("revealed");

    // Display revealed player's name and club
    const nameEl = card.querySelector(".player-name");
    nameEl.textContent = player.name;
    nameEl.className = "player-name fw-bold text-light";

    const metaEl = card.querySelector(".player-meta");
    metaEl.textContent = player.club;

    // Replace hint area with point confirmation badge
    const hintContainer = card.querySelector(".hint-container");
    hintContainer.innerHTML = `<span class="badge bg-success bg-opacity-25 text-success border border-success py-1 px-2">+${pointsAwarded} pts</span>`;

    updateDashboard();
    announceFeedback(`Correct! ${player.name} (+${pointsAwarded} pts)`, "feedback-success");

    checkRoundState();
  }

  // Handles wrong answers: checks for duplicates and counts strikes
  function handleStrike(rawName, cleanGuess) {
    // If the user already guessed this name previously, do not penalize twice
    if (strikes.has(cleanGuess)) {
      announceFeedback(`You already tried "${rawName}".`, "feedback-warning");
      return;
    }

    strikes.add(cleanGuess);
    updateDashboard();

    if (strikes.size >= MAX_STRIKES) {
      endRound(false); // 3 strikes reached: round over
    } else {
      announceFeedback(`"${rawName}" is incorrect! Strike ${strikes.size} of ${MAX_STRIKES}`, "feedback-error");
    }
  }

  // ------------------------------------------------------------------------
  // 7. ROUND TRANSITIONS & GAME OVER
  // ------------------------------------------------------------------------

  // Checks if all 5 cards have been successfully solved
  function checkRoundState() {
    const allSolved = activeSlots.every((slot) => slot.revealed);
    if (allSolved) {
      const sweepBonus = 25; // Clean sweep bonus for solving all 5
      score += sweepBonus;
      updateDashboard();
      endRound(true, sweepBonus);
    }
  }

  // Ends the round, disables input, and shows the Next Season button
  function endRound(isSuccess, sweepBonus = 0) {
    guessInput.disabled = true;
    submitBtn.disabled = true;

    if (revealAllBtn) revealAllBtn.classList.add("d-none");

    if (isSuccess) {
      announceFeedback(`Round Complete! Clean sweep bonus (+${sweepBonus} pts)!`, "feedback-success");
    } else {
      announceFeedback(`Round over! Revealing remaining scorers.`, "feedback-error");
      revealRemainingCards();
    }

    if (nextRoundBtn) {
      nextRoundBtn.classList.remove("d-none");
      nextRoundBtn.focus();
    }
  }

  // Reveals any unsolved cards in red (.missed) when round ends
  function revealRemainingCards() {
    activeSlots.forEach((slot, index) => {
      if (!slot.revealed) {
        const card = document.getElementById(`card-${index}`);
        card.classList.add("missed");

        // If it was a Card #5 tie, show all eligible names separated by a slash
        const displayName = slot.isTied
          ? slot.tiedOptions.map((o) => o.name).join(" / ")
          : slot.name;

        const nameEl = card.querySelector(".player-name");
        nameEl.textContent = displayName;
        nameEl.className = "player-name fw-bold text-light";

        const metaEl = card.querySelector(".player-meta");
        metaEl.textContent = slot.club;

        const hintContainer = card.querySelector(".hint-container");
        hintContainer.innerHTML = `<span class="badge bg-danger bg-opacity-25 text-danger border border-danger">Missed</span>`;
      }
    });
  }

  // Synchronizes visual numbers with current state values
  function updateDashboard() {
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (strikeDisplay) strikeDisplay.textContent = `${strikes.size} / ${MAX_STRIKES}`;
    if (roundDisplay) roundDisplay.textContent = roundNumber;
  }

  // ------------------------------------------------------------------------
  // 8. EVENT LISTENERS
  // ------------------------------------------------------------------------

  // Form submission (typing a name and pressing enter or clicking 'Guess')
  guessForm.addEventListener("submit", processGuess);

  // 'Reveal All' button click: forfeits current round
  if (revealAllBtn) {
    revealAllBtn.addEventListener("click", () => {
      endRound(false);
    });
  }

  // 'Next Season' button click: advances round number and draws new season
  if (nextRoundBtn) {
    nextRoundBtn.addEventListener("click", () => {
      roundNumber += 1;
      loadSeason();
    });
  }

  // Run initial game setup when DOM is ready
  initGame();
});