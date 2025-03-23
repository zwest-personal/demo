# TicNEToe

Expansion on the take home quiz, for funsies.

Interactive game where you specify the size of the game board, the number of 
cells required for a win, and then play through a simple interface.

Can be played 1P (with the dumbest AI ever) or 2P from command line.

Would be easy enough to throw a UI in front of it and play that way.

Unlike the quiz, where a pre-made grid is provided to the class to process, 
the game drops in the tokens like you would in Connect-4 and then checks
the board for a winner after each play.  Winning conditions are derived
from the TicTacToe game rather than real Connect-4.

## Use

Install:
`npm run clean-install`

Run locally on command line:
`npm run local`

Run tests:
`npm test`