import Player from '@src/lib/players/player';
import logger from '@src/common/logger';

import InvalidPlayError from '@src/types/errors/InvalidPlayError';
import InvalidBoardError from '@src/types/errors/InvalidBoardError';
import {Bitmap, createBitmap, updateBitmap} from '@src/helpers/bitmap';

// min and max values for board size and victory sets
const minVictorySize = 3, minBoardSize = 3;
const maxVictorySize = Number.MAX_SAFE_INTEGER, maxBoardSize = Number.MAX_SAFE_INTEGER;

// Grid coordinates
export interface Coordinate {
  row: number;
  col: number;
}

/**
 * Gameboard is the ticnetoe game structure
 *
 * Upon start player will be asked to pick a size (always square),
 * and will be limited to something 'reasonable'
 * Gameboard watches for victory conditions as players input
 *
 * Includes same trio of required functions as the original 'test'
 */
class Gameboard {
  // boardSize is how wide/tall the board is
  public readonly boardSize: number;

  // victorySize is how long a run must be to win.
  // square victories are expected to be floor(victorySize/2) to a side
  public readonly victorySize: number;

  // victoryBoxSize is the winning condition where you create a 'box' within
  // Due to potential to have odd victorySize values, this box may require more tokens overall than a linear victory
  public readonly victoryBoxSize: number;

  // board defines the current gameboard state.  null indicates no player/empty space
  public readonly board: (Player | null)[][];

  // heightMap tracks how tall each column current is
  private heightMap: number[];

  // emptySpaces keeps a tally of how many open spaces are left
  // the game ends in a tie if it ever reaches the total space left with no winner flagged
  private emptySpaces: number;

  // winner is the winning player for this board
  private winner: Player | null;

  public constructor(size: number, victorySize: number) {
    if (size > maxBoardSize || size < minBoardSize) {
      throw new InvalidBoardError(`board must be between ${minBoardSize} and ${maxBoardSize}, inclusive`);
    }

    if (victorySize > maxVictorySize || victorySize < minVictorySize || victorySize > size) {
      throw new InvalidBoardError(`victory size must be between ${minVictorySize} and ` +
        `${Math.min(maxVictorySize, size)}, inclusive`);
    }

    this.boardSize = size;
    this.victorySize = victorySize;
    this.victoryBoxSize = Math.ceil(victorySize / 2);
    this.emptySpaces = this.boardSize ** 2;
    this.winner = null;
    this.board = Array.from({length: this.boardSize},
      () => Array(this.boardSize)
        .fill(null) as (Player | null)[]);

    this.heightMap = new Array(this.boardSize).fill(0) as number[];
  }

  /**
   * checkWinner simply returns the winning player object
   * Winner is checked for after each move rather than when this is called, so there is no cost.
   *
   * @return Player winning player object, or null if not set
   */
  public checkWinner(): Player | null {
    return this.winner;
  }

  /**
   * movesLeft returns how many moves are still available before a tie
   *
   * Could probably just be a getter, though this was just a tweak on the original requirement
   *
   * @return number How many remaining spaces there are
   */
  public movesLeft(): number {
    return this.emptySpaces;
  }

  /**
   * isGameOver checks if either there's a winner or there are no moves left
   *
   * @return boolean true if game has ended (with winner or tie), false if there's plays left
   */
  public isGameOver(): boolean {
    return this.checkWinner() !== null || this.movesLeft() === 0;
  }

  /**
   * play drops a token into the stack
   *
   * throws an error if the play is invalid
   *
   * TODO Doesn't work yet, always triggers winner on first play but need to give spouse the laptop =p
   *
   * @param player
   * @param col
   */
  public play(player: Player, col: number) {
    // If column is invalid, throw error
    if (col < 0 || col > this.boardSize) {
      throw new InvalidPlayError(`column played must be between 0 and ${this.boardSize}`);
    }

    // If column is valid, but is peaked, throw error
    if (this.heightMap[col] === this.boardSize) {
      throw new InvalidPlayError(`column ${col} cannot be played - it has reached the top`);
    }

    const row = this.boardSize - this.heightMap[col] - 1;

    // TODO Need some tweaks here?
    logger.debug(`Playing: ${player.rune()} ${col},${row}`);
    this.board[row][col] = player;
    this.heightMap[col]++;
    this.emptySpaces--;
    player.verifiedPlay({col, row});
    logger.debug(this.toString());

    // Check for winner using the latest play as a starting point
    const winner = this.checkWinningCoordinate(({col, row} as Coordinate));
    if (winner !== null) {
      this.winner = winner;
    }
  }

  /**
   * toString returns the gameboard as a console ready string
   *
   * @return string ready-to-print view of board
   */
  public toString(): string {
    let output = '\n';
    this.board.forEach(row => {
      row.forEach(cell => {
        output += (cell !== null) ? cell.rune() : '_';
      });
      output += '\n';
    });
    return output;
  }

  /**
   * Private Functions
   */

  /**
   * compareCoordinates looks at the provided coordinates and returns their value if all match
   *
   * If they do not match null is returned.  Empty coordinates immediately return null.
   *
   * TODO Allow for Player to be passed in - since we're testing after each move only the last player to play
   * could win.
   *
   *
   * @param coords number[][] Board coordinates to compare.  Any number can be checked.
   * @return Player | null Player object if all coords match, or null if they do not
   */
  private compareCoordinates(...coords: Coordinate[]): Player | null {
    let player;

    for (const v of coords) {
      const boardValue = this.board[v.row][v.col];

      // Return immediately if any are empty
      if (boardValue === null) {
        return null;
      }

      if (typeof player === 'undefined') player = boardValue;

      if (boardValue !== player) {
        return null;
      }
    }

    return player ?? null;
  }

  /**
   * checkWinningCoordinate looks at the provided x/y coordinate to see if it falls into any winning combos
   *
   * Function has to account for victory size potentially not being the full size of the grid, so diagonal
   * victories can happen in a lot of places.  So need to step from the provided coordinate to any neighbor
   * that matches and keep track of the 'path' taken.
   *
   * For horizontal, vertical, diagonal wins - need to keep going in same direction as first
   * For box - need to start horizontal/vertical but keep tabs on the layout.
   *
   * Lots of ways you could try to optimize the hell out of the pathfinding, but given the size
   * of the board none really matter.
   *
   * @param c Coordinate pair to check
   * @private
   * @return Player winning player, or null
   */
  private checkWinningCoordinate(c: Coordinate): Player | null {
    const p = this.board[c.row][c.col];
    if (p === null) {
      return null;
    }

    // Corners win, no matter the victory size, but only if we're *in* a corner
    if (c.col === (this.boardSize - 1 || 0) && c.row === (this.boardSize - 1 || 0)) {
      const checkCorners = this.compareCoordinates(
        {col: 0, row: 0},
        {col: 0, row: this.boardSize - 1},
        {col: this.boardSize - 1, row: 0},
        {col: this.boardSize - 1, row: this.boardSize - 1},
      );
      if (checkCorners !== null) { // } Player) {
        logger.debug('Corners Victory');
        return checkCorners;
      }
    }

    /**
     * Iterate through the conditions
     * Could reduce this down more # of lines wise but doesn't gain much to do so
     * (eg by storing all the sets of steps into an array and iterating over it)
     *
     * TODO Switch to using the bitwise op - on very large boards more efficient and would unify solution
     *
     * The walk method works fine but if we wanted to unify the victory test then every condition
     * could use a variation of the boxCheck routine.
     *
     * Diagonal could be done as a bitwise |
     * Horizontal could be done by looking at each row individually
     * Vertical could be done as a bitwise & where
     */

    // Horizontal
    const [, ECount] = this.walkBoard(p, c, {row: 0, col: 1}, false);
    const [, WCount] = this.walkBoard(p, c, {row: 0, col: -1}, true);
    if (ECount + WCount >= this.victorySize) {
      logger.debug('E/W Victory');
      this.winner = p;
      return p;
    }

    // Vertical
    const [, SCount] = this.walkBoard(p, c, {row: 1, col: 0}, false);
    const [, NCount] = this.walkBoard(p, c, {row: -1, col: 0}, true);
    if (SCount + NCount >= this.victorySize) {
      logger.debug('N/S Victory');
      this.winner = p;
      return p;
    }

    // Diagonal - NE/SW
    const [, NECount] = this.walkBoard(p, c, {col: 1, row: -1}, false);
    const [, SWCount] = this.walkBoard(p, c, {col: -1, row: 1}, true);
    if (NECount + SWCount >= this.victorySize) {
      logger.debug('NE/SW Victory');
      this.winner = p;
      return p;
    }

    // Diagonal - NW/SE
    const [, NWCount] = this.walkBoard(p, c, {col: -1, row: -1}, false);
    const [, SECount] = this.walkBoard(p, c, {col: 1, row: 1}, true);
    if (NWCount + SECount >= this.victorySize) {
      logger.debug('NW/SE Victory');
      this.winner = p;
      return p;
    }

    // Might have a box, pass off to the dedicated function for it
    if (this.boxCheck(p) !== null) {
      logger.debug('Box Victory');
      this.winner = p;
      return p;
    }

    // No winner yet
    return null;
  }

  /**
   * walkBoard goes from the requested point along an x/y axis, looking for matches
   *
   * @param p Player
   * @param coords Coordinate
   * @param step Coordinate Steps to use, as [x,y] - eg [1,0] means 'step once right'
   * @param skip Skip 'this' coordinate and just step into the next
   * @private
   */
  private walkBoard(p: Player, coords: Coordinate, step: Coordinate, skip = false): [Player | null, number] {
    // Make sure we didn't step outside the board
    if (coords.row < 0 || coords.col < 0 || coords.row >= this.boardSize || coords.col >= this.boardSize) {
      return [null, 0];
    }
    const space = this.board[coords.row][coords.col];

    // If the space is empty, or doesn't match the player that came in, return null
    if (space !== p) {
      return [null, 0];
    }

    // Space matches, but we're at the edge of the board. Return
    const nextSpace = {col: coords.col + step.col, row: coords.row + step.row} as Coordinate;

    // Space matches, and we can keep going. Recurse
    const [, tally] = this.walkBoard(p, nextSpace, step);
    return [p, (skip) ? tally : tally + 1];
  }

  /**
   * boxCheck looks for a 'box' victory condition, where an x by x square of the same player's tokens is
   * found.
   *
   * Does so by converting the board to bitmap (with the requested player as 1s) and does a bitwise AND
   * across the rows, looking for a sequence of rows of sufficient length that generate the needed number
   * of columns matching.
   *
   * This could be used for all win conditions as it is - just change the comparison op
   *
   * @param p Player to check for.  Only check for a box victory for the one player.
   * @return Player | null Winning Player (would always be the same as p), or null if there was none
   *
   */
  private boxCheck(p: Player): Player | null {
    const boardMap = p.map;
    const winningBoxMatch = new RegExp(`[1]{${this.victoryBoxSize}}`, 'g');

    // Box Victory
    // Iterate over the bitmap rows, comparing this.victoryBoxSize rows at a time with a bitwise &
    // and checking if the outcome includes a this.victoryBoxSize number of 1s in a row.
    for (let row = 0; row < boardMap.length + 1 - this.victoryBoxSize; row++) {
      let comparison: number = boardMap[row];
      (boardMap.slice(row + 1, row + this.victoryBoxSize)).forEach((boxRow: number) => {
        comparison = comparison & boxRow;
      });

      // Check the comparison, using a regex just to look at the result as a string
      if ((comparison.toString(2).match(winningBoxMatch) ?? []).length > 0) {
        // Got a long enough bitmap match, return
        return p;
      }
    }

    return null;
  }
}

export default Gameboard;