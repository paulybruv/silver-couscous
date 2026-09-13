# Premier League Recall

A lightweight browser game where players try to recall the top 5 goalscorers from a random Premier League season. The game is built with plain HTML, CSS, and JavaScript and runs directly in the browser on desktop, tablet, and mobile devices.

## What the game does
- Shows a random Premier League season
- Challenges the player to guess the top 5 goalscorers
- Accepts full names, surnames, and common aliases
- Awards points for correct answers
- Allows a club hint for a lower score value
- Tracks strikes and ends the round after 3 incorrect guesses
- Reveals missed players and moves to the next season
- Works responsively across different screen sizes and devices

## Basic user case scenarios

### 1. Quick knowledge challenge
A user opens the game and wants to test how well they remember Premier League top scorers from recent or past seasons. They see the season heading, type a player surname, and submit guesses until they have identified all five scorers or used up their three strikes.

### 2. Learning from missed answers
A player is unsure of one of the names and clicks a club hint on a slot. The hint reveals the club, which helps them narrow down the player while costing them points. If they later guess correctly, they still get a smaller reward than a full unhinted answer.

### 3. Competitive score play
A user is trying to beat their previous score. Each correct guess adds points, a hidden card can be solved with a hint for fewer points, and a perfect round earns a clean sweep bonus. The score tracker updates live as the round progresses.

### 4. Casual replay loop
After a round ends, the game reveals any remaining players and gives the user the option to move on to the next season. The next round loads another random season, so the user can keep replaying without repetition.

### 5. Practice for football fans
A football fan uses the game as a quick memory exercise for seasons such as 2011-12, 2017-18, or other historical campaigns. The structure is easy to replay and encourages repeated play as they improve their recall.

## How to run
1. Download or clone the project.
2. Open the project folder in a browser.
3. Open the index.html file to start the game.

The app is designed to be responsive, so it can be played on a laptop, tablet, or mobile phone without needing a separate version for each device.

## How Our Team Used AI in This Project 

As a team of beginner developers, we used AI as a patient pair-programmer and interactive tutor rather than just a code generator. It helped us turn our initial game idea into a working single-page application, guided us through tricky JavaScript logic, and kept us from getting bogged down in repetitive setup so we could focus on learning and building features together.

---

### 1. Helping Us Build the Project
* **Structuring the 33-Season Dataset:** Manually researching and typing out 33 seasons of football statistics would have taken days and led to typos[cite: 2]. We used AI to help structure all 33 Premier League campaigns into clean JavaScript objects inside `data.js`, standardising fields for ranks, goals, clubs, and common nicknames (like "RVP" or "Mo Salah")[cite: 2].
* **Setting Up the Game Engine:** We agreed on our core rules (guess 5 players, allow 3 strikes, deduct points for hints), but connecting all the moving parts across the DOM was a challenge[cite: 4]. We prompted AI with our specific rules, and it helped us assemble the starting game loop in `script.js`—from dynamically rendering the 5 blank cards to validating inputs and calculating scores[cite: 4].

---

### 2. Solving Bugs & Learning as a Team
* **Handling Accents & Foreign Names:** During manual testing, names like **Ole Gunnar Solskjær** and **Sadio Mané** triggered false strikes whenever we typed standard English letters ("Solskjaer", "Mane")[cite: 2, 4]. AI taught our team how to use `.normalize("NFD")` to strip diacritics from both the user's input and our stored dataset, ensuring fair matching without cluttering our arrays[cite: 4].
* **Preventing Accidental Double Strikes:** Early on, guessing the same wrong name twice cost two separate strikes. AI showed us how to implement a `Set` (`guessedSubmissions`) to track previous entries and output a friendly warning message instead of unfairly penalising the player[cite: 4].
* **Debugging the "Loading..." Startup Error:** When we first ran the project locally, the card slots failed to render and the heading stayed frozen on "Loading..."[cite: 1, 4]. AI guided us to check the browser developer console, where we spotted a `ReferenceError` caused by `script.js` loading before `data.js`[cite: 1, 4]. Reordering the script tags in `index.html` solved the bug immediately[cite: 1].

---

### 3. Improving Layout & User Experience 
* **Eliminating Cumulative Layout Shift (CLS):** When cards rendered or feedback messages popped up, the bottom half of the screen would visibly jump. AI explained layout shifts to us and suggested adding explicit `min-height` reservations to `#season-heading` and `#slots-container` in `style.css` so the page remains steady on both desktop and mobile.
* **Accessible Contrast Checking:** Our original grey subtitles on dark cards were difficult to read. AI helped us review our palette and recommended switching to `#cbd5e1`, bringing our text-to-background contrast well above the 4.5:1 WCAG AA benchmark.
* **Screen Reader Feedback:** AI guided us in adding `role="alert"` and `aria-live="polite"` to our feedback container in `index.html`[cite: 1]. This ensures screen-reader users hear dynamic updates after each guess without needing a full page reload[cite: 1, 4].

---

### 4. Team Workflow & What We Learned 
* **Understanding New Concepts:** We made a point not to paste code blindly. When AI introduced the **Fisher-Yates shuffle**, we asked it to explain the math[cite: 4]. Learning how it simulates drawing slips from a hat helped us understand why it prevents repeated seasons better than a simple `.sort()`[cite: 4].
* **Separating Data from Game Logic:** AI recommended separating our data into `data.js` and our engine into `script.js` right from the start[cite: 1, 2, 4]. This kept the project organised and allowed us to divide tasks cleanly—one person could refine dataset aliases while others focused on CSS styling and game features without creating git merge conflicts[cite: 2, 4].
* **Supporting Our Git Workflow:** Using AI to help structure clear commit messages and review pull requests gave our team confidence in managing our feature branches, ensuring we could collaborate effectively and hit all of our project goals.

## Basic wireframes

### Main game screen

```text
+--------------------------------------------------------------+
| Premier League Recall         Score: 0     Strikes: 0/3      |
+--------------------------------------------------------------+
|                       2011-12                                |
|      Can you name the top 5 goalscorers from this season?     |
|                                                              |
|  [Enter Player Surname or Full Name]   [Submit]              |
|  Feedback message here                                        |
|                                                              |
|  [Card 1]   [Card 2]   [Card 3]                              |
|  [Card 4]   [Card 5]                                         |
|                                                              |
|  [Reveal Remaining]     [Next Season]                        |
+--------------------------------------------------------------+
```

### Individual slot card

```text
+--------------------------------------+
| #1 | ???                    |
| ??? goals | ???                    |
| [Club Hint (-5 pts)]               |
+--------------------------------------+
```

### End of round state

```text
+--------------------------------------------------------------+
| Premier League Recall         Score: 120   Strikes: 3/3      |
+--------------------------------------------------------------+
| Round over! The remaining scorers have been revealed.        |
|                                                              |
|  [Card 1]   [Card 2]   [Card 3]                              |
|  [Card 4]   [Card 5]                                         |
|                                                              |
|                           [Next Season]                      |
+--------------------------------------------------------------+
```

## Why we split the JavaScript into a data file and script file
This project uses two JavaScript files:
- data.js contains the season data and player information
- script.js contains the game logic, event handlers, scoring, and round flow

This separation is useful because it keeps the project easier to maintain. The data file acts like a structured source of information, while the script file focuses on how that information is used in the game. This makes it simpler to update the player list or add new seasons without rewriting the logic. It also helps keep the code organised, clearer to read, and easier to debug when something goes wrong.

### Advantages of this approach
- Cleaner code structure: data and logic are kept in separate places
- Easier updates: new players or seasons can be added to the data file without changing the game logic
- Better maintenance: developers can work on the game rules without affecting the dataset
- Reusability: the same data can be loaded into other scripts or future versions of the app
- Improved readability: the project is easier for new developers to understand

### What could go wrong if we did not separate them
If all the data and logic were placed in one JavaScript file, the project could become harder to manage. It would be more difficult to find specific parts of the code, update player information, or fix logic errors without accidentally changing the data. The file could become long and cluttered, making the app harder to test, harder to scale, and more likely to contain bugs when making future changes.

In a larger project, keeping data separate also helps with version control and collaboration, because one developer can update the dataset while another works on the game engine without creating unnecessary conflicts.

## Project stack
- HTML
- CSS
- JavaScript
- Bootstrap 5

## Notes
This build is a static front-end game and does not require a backend or database setup. It is built to be accessible and easy to use on any device, regardless of screen size.