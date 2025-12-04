import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tic-tac-toe');

  
  gameBoard: string[] = Array(9).fill(''); // Game board is a 3x3 grid, so its an array
  currentPlayer: string = 'X'; // Player X always starts first
  winner: string | null = null; // No winner is set at the start
  isDraw: boolean = false; // Flag to indicate if the game is a draw

  makeMove(index: number) { // Function for making moves
    // Only allow move if the cell is empty and there is no winner yet
    if (this.gameBoard[index] === '' && !this.winner) {
        this.gameBoard[index] = this.currentPlayer; // Place the current player's mark
        if (this.checkWinner()) { // Check if this move wins the game
          this.winner = this.currentPlayer; // Set the winner
        } else if (this.checkDraw()) { // Check for a draw
          this.isDraw = true;
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'; // Switch players
        }
  }
  }

  checkWinner(): boolean { // Function to check for a winner
    const winningCombos = [ // All possible winning combinations
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    return winningCombos.some((combos) =>{ // Check each winning combination
      const [a, b, c] = combos; 
      return (
        this.gameBoard[a] && // Ensure the box is not empty
        this.gameBoard[a] === this.gameBoard[b] && // Check first and second box
        this.gameBoard[a] === this.gameBoard[c]    // Check first and third box
        
      );
    });
  }

  restartGame() {
    this.gameBoard = Array(9).fill(''); // Reset the game board
    this.currentPlayer = 'X'; // Reset to player X
    this.winner = null; // Clear the winner
    this.isDraw = false; // Clear the draw flag
  }

  checkDraw() {
    return this.gameBoard.every(box => box !== '') && !this.winner; // Check if all cells are filled and no winner
  }

}
