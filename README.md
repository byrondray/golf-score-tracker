# Golf App: Play and Track Your Rounds

## Overview

This **Golf App** is designed to enhance your golfing experience by making it easy to organize, play, and track rounds. The app requires **4 players** to start a round. Partnerships are randomized at the start and switch every **4 holes**, ensuring every player partners with each other at least once during an 18-hole game.

---

## Key Features

### Core Gameplay
- **4-Player Rounds**:
  - The app enforces that each round must have exactly four players.
- **Random Partnerships**:
  - At the start of the round, players are paired into teams randomly.
  - Partnerships switch after every 4 holes, so every player partners with each other once.
- **Score Tracking**:
  - Players enter their golf scores (e.g., 4 on a par 3).
  - The app automatically determines the winning team per hole.
  - Points are awarded:
    - **1 point** to the winning team for each hole.
    - **0 points** to the losing team.
    - In the case of a tie, all players receive **1 point**.

### Round Management
- **Start a Round**:
  - Add 3 players from your friend list and start a new round.
- **Round in Progress**:
  - Enter scores for each hole and see your current partnership.
  - Track your progress through all 18 holes.
- **Round Summary**:
  - At the end of the round, view all players' scores and determine the winner.
  - The top player is highlighted in the summary.

### Friends Integration
- Add and manage your friend list.
- Easily select players from your friends to create a round.

---

## How It Works

### 1. Start a Round
- Navigate to the **Start Round** page.
- Select 3 additional players from your friend list.
- The app ensures the total number of players is exactly 4.
- Random partnerships are assigned for the first 4 holes.

### 2. Play the Round
- Enter each player’s score for the hole on the **Round In Progress** page.
- Partnerships automatically switch after every 4 holes.
- Repeat until all 18 holes are completed.

### 3. View Round Summary
- At the end of the round, view a **Round Summary** showing:
  - Total scores for each player.
  - The winner highlighted at the top of the list.

---

## Design Focus

### Gameplay Flow
- **Random Partnerships**:
  - Ensures variety and fairness by rotating teammates every 4 holes.
- **Score Simplification**:
  - Focuses on hole-by-hole competition where teams win or tie the hole.

### User-Friendly Interface
- Clean and consistent design with **Tailwind CSS**.
- Intuitive navigation using **TanStack Router**.

---

## How to Start

1. Add 3 friends to your round.
2. Begin entering scores hole by hole.
3. Partnerships will switch every 4 holes.
4. Finish all 18 holes and view the final scores.

This app ensures a fun, competitive, and seamless golfing experience with friends!
