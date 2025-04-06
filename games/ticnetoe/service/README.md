# TicNEToe

Expansion on a interview take home quiz that saw the creation of a basic class that had
to fulfill a few requirements.  Doing for funsies.

Interactive game where you specify the size of the game board, the number of 
cells required for a win, and then play through a simple interface.

Can be played 1P (with the dumbest AI ever) or 2P from command line.  
Currently can just watch two randobots fight it out on a giant board, but next steps are adding
human play and then a CPU player that can attempt to make logical decisions.

Would be easy enough to throw a UI in front of it and play that way.

Unlike the quiz, where a pre-made grid is provided to the class to process, 
the game drops in the tokens like you would in Connect-4 and then checks
the board for a winner after each play.  Winning conditions are derived
from the TicTacToe game rather than real Connect-4.

While I wanted to demonstrate a bit more TS knowhow with this project, I found that
there weren't many 'complex' behaviors with much use here (eg Decorators, Mixins, etc).

## Use

Install:
`npm run clean-install`

Run locally on command line:
`npm run local`
or
`npm run local:win` if windows CLI

Run tests:
`npm test`

# TODOs
- Prep front-end site
- Add in build/run scripts