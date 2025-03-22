# SimpliSafe Take-Home

Implementation of a solution to the take-home test sent by SimpliSafe.

This iteration implements the below 'As written' without going beyond the requirements.

`simpli-ticnetoe` ("Tic Any Toe") takes the idea behind the test and makes a whole interactive
game out of it just for funsies.

## As written
```
Implement a 4x4 Tic-Tac-Toe/Connect Four solver. The program
should take in a representation of a 4x4 board, and tell you the
winner if any.
Victory is determined by one of five conditions:
1. Vertical
2. Horizontal
3. Diagonal
4. All Four Corners
5. 2x2 box
   Implementing a UI is not necessary: we are only interested in
   your implementation of the win condition.
   Implement the below functions, and feel free to create any other
   types that you need, as well as unit tests (just tell us how to
   run them!).
   */
   class TicTacToe {
   public checkWinner(/* {{ params, if any }} */): /*{{ return
   type }}*/ {
   }
   public anyMovesLeft(/* {{ params, if any }} */): /*{{ return
   type }}*/ {
   }
   public isGameOver(/* {{ params, if any }} */): /*{{ return
   type }}*/ {
   }
}
```

## Notes
- Will implement in TypeScript, as that is the primary language used at SimpliSafe (plus the rough code in the PDF aligns with TypeScript)
- Test specifies a 4x4, operating on that assumption (though the full game allows any size)
- Mismatched play amounts are checked for, as well as invalid board sizes
- Implementation completes the task basically as is with little fanfair and with strict adherence to board size/win states.

Since this is only a 4x4 board not much thought was put into optimizing.\
The 'full' game has to account for that since the board can be much larger.