# Tic-Tac-Toe

A classic Tic-Tac-Toe game built with Angular 21.0.1.

## Project Setup

### Initial Setup
1. Create a new Angular project:
```bash
ng new tic-tac-toe
```
- Selected **CSS** for styling (default)
- Declined AI assistance features

2. Navigate into the project directory:
```bash
cd tic-tac-toe
```

3. Open the project in Visual Studio Code:
```bash
code .
```

## Building the Game

### Step 1: Create the HTML Structure

Navigate to `src/app/app.html` and delete all the default Angular boilerplate content.

Add the game markup:
```html
<main class="main">
  <div class="content">
    <div class="header-container">
      <h1>TIC-TAC-TOE</h1>
      <p>Click on a box to make your move!</p>
    </div>
    
    <div class="game">
       <div class="tto-column">
        
          @for (box of gameBoard; track $index) {
            <div class="box" (click)="makeMove($index)">
              {{ box }}
            </div>
          }
       </div>
       
      @for (currentPlayer of currentPlayer; track $index) {
        <p class="current-player"> CURRENT PLAYER: <span>{{currentPlayer}}</span> </p>
       }
       @if (winner) {
        <p class="winner-txt"><span>{{ winner }}</span> WON THE GAME 🎉!</p>
        <button class="primary-btn mx-auto" (click)="restartGame()">Start a new game</button>
       } @else if (isDraw) {
        <p class="winner-txt">IT'S A DRAW! 🤝</p>
        <button class="primary-btn" (click)="restartGame()">Start a new game</button>
       }
    </div>
   
  </div>
</main>
```

### Step 2: Style the Game Board

In `app.html`, add the essential CSS for the game grid:

**Game Box Styling:**
```css
.box {
  width: 120px;
  height: 120px;
  border: 2px solid var(--special-grey);
  box-shadow: 9px 8px 0px rgb(0, 0, 0);
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 90px;
  font-weight: 900;
  cursor: pointer;
}
```

**Grid Layout:**
```css
.tto-column {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
```

Additional styling was added based on personal preference for colors, fonts, and layout.

### Step 3: Implement Game Logic

Navigate to `src/app/app.ts` to add the TypeScript logic.

#### Declare Game Variables
```typescript
gameBoard: string[] = Array(9).fill(''); // 3x3 grid represented as 9-element array
currentPlayer: string = 'X'; // Player X always starts first
winner: string | null = null; // Tracks the winner (null if no winner yet)
isDraw: boolean = false; // Tracks if the game ended in a draw
```

#### Create the Move Function
```typescript
makeMove(index: number) {
  // Only allow move if the cell is empty and there's no winner
  if (this.gameBoard[index] === '' && !this.winner) {
    this.gameBoard[index] = this.currentPlayer; // Place X or O
    
    if (this.checkWinner()) {
      this.winner = this.currentPlayer; // Set winner if match found
    } else if (this.checkDraw()) {
      this.isDraw = true; // Flag as draw if board is full
    } else {
      // Switch between players using ternary operator
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}
```

**Key Point:** The ternary operator at the end switches between 'X' and 'O' after each valid move.

#### Check for Winner
```typescript
checkWinner(): boolean {
  // Define all 8 possible winning combinations
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  
  // Check if any combination has three matching symbols
  return winningCombos.some((combos) => {
    const [a, b, c] = combos;
    return (
      this.gameBoard[a] && // Ensure box is not empty
      this.gameBoard[a] === this.gameBoard[b] && // First matches second
      this.gameBoard[a] === this.gameBoard[c]    // First matches third
    );
  });
}
```

**How it works:** The function uses `.some()` to iterate through all winning combinations and checks if all three positions contain the same non-empty value.

#### Check for Draw
```typescript
checkDraw() {
  // Game is a draw if all boxes are filled and there's no winner
  return this.gameBoard.every(box => box !== '') && !this.winner;
}
```

**How it works:** Uses `.every()` to verify all 9 cells are filled, and confirms no winner was declared.

#### Restart the Game
```typescript
restartGame() {
  this.gameBoard = Array(9).fill(''); // Clear all boxes
  this.currentPlayer = 'X'; // Reset to player X
  this.winner = null; // Clear winner
  this.isDraw = false; // Clear draw flag
}
```

**How it works:** Resets all game state variables to their initial values, allowing players to start a fresh game without reloading the page.

## Running the Application

Start the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The game will auto-reload when you make changes.

## Game Features

- ✅ Two-player gameplay (X and O)
- ✅ Win detection for all 8 possible combinations
- ✅ Draw detection when board is full
- ✅ Restart functionality
- ✅ Visual feedback for current player
- ✅ Clean, modern UI with custom styling

## Technologies Used

- Angular 21.0.1
- TypeScript
- CSS (default)
- HTML

## Additional Resources

For more information on Angular CLI commands, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
