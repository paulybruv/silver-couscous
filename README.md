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

## How we used AI
This project used AI to help speed up the build process and improve the quality of the implementation. AI was used to:
- structure the game concept and identify the core user flow
- generate the initial HTML layout and JavaScript logic for the guessing game
- help write clean, readable code for scoring, hints, strikes, and round progression
- suggest improvements to the README and project documentation
- support debugging and refinement of the browser game logic

AI was used as a development assistant to help create and validate the project, but the final game design and decisions were shaped around the actual user experience we wanted for a football trivia guessing game.

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