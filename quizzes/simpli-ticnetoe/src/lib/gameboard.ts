import Player from '@src/lib/interfaces/player';
import logger from '@src/common/logger';

import InvalidPlayError from '@src/types/errors/InvalidPlayError';
import InvalidBoardError from '@src/types/errors/InvalidBoardError';

// min and max values for board size and victory sets
const minVictorySize = 3, minBoardSize = 3;
const maxVictorySize = 8, maxBoardSize = 10;

// Grid coordinates
interface Coordinate {
  x: number;
  y: number;
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
  private board: (Player | null)[][];

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

    // initialize our board to 0's, to indicate empty
    this.board = new Array(this.boardSize).fill(
      new Array(this.boardSize).fill(null),
    ) as (Player | null)[][];
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
   * @param player
   * @param column
   */
  public play(player: Player, column: number) {
    // If column is invalid, throw error
    if (column < 0 || column > this.boardSize) {
      throw new InvalidPlayError(`column played must be between 0 and ${this.boardSize}`);
    }

    // If column is valid, but is peaked, throw error
    if (this.heightMap[column] === this.boardSize) {
      throw new InvalidPlayError(`column ${column} cannot be played - it has reached the top`);
    }

    // TODO Need some tweaks here?
    this.board[this.heightMap[column]][column] = player;
    this.heightMap[column]++;
    this.emptySpaces--;

    // TODO Check for winner before returning
    const winner = this.checkWinningCoordinate(({x: this.heightMap[column] - 1, y: column} as Coordinate));
    if (winner !== null) {
      this.winner = winner;
    }
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
   * @param coords number[][] Board coordinates to compare.  Any number can be checked.
   * @return Player | null Player object if all coords match, or null if they do not
   */
  private compareCoordinates(...coords: Coordinate[]): Player | null {
    let player;
    logger.debug('Check coords: ', coords);

    for (const v of coords) {
      const boardValue = this.board[v.x, v.y];

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
    const p = this.board[c.x][c.y];
    if (p === null) {
      return null;
    }

    // Corners win, no matter the victory size, but only if we're *in* a corner
    if (c.x === (this.boardSize - 1 || 0) && c.y === (this.boardSize - 1 || 0)) {
      const checkCorners = this.compareCoordinates(
        {x: 0, y: 0},
        {x: 0, y: this.boardSize - 1},
        {x: this.boardSize - 1, y: 0},
        {x: this.boardSize - 1, y: this.boardSize - 1},
      );
      if (checkCorners instanceof Player) {
        return checkCorners;
      }
    }

    /**
     * Iterate through the conditions
     * Could reduce this down more # of lines wise but doesn't gain much to do so
     * (eg by storing all the sets of steps into an array and iterating over it)
     *
     * If we wanted to add more unique win conditions then it'd be worthwhile
     */

    // Horizontal
    const [, ECount] = this.walkBoard(p, c, {x: 1, y: 0}, true);
    const [, WCount] = this.walkBoard(p, c, {x: -1, y: 0}, true);
    if (ECount + WCount >= this.victorySize) {
      this.winner = p;
      return p;
    }

    // Vertical
    const [, SCount] = this.walkBoard(p, c, {x: 0, y: 1}, true);
    const [, NCount] = this.walkBoard(p, c, {x: 0, y: -1}, true);
    if (SCount + NCount >= this.victorySize) {
      this.winner = p;
      return p;
    }

    // Diagonal - NE/SW
    const [, NECount] = this.walkBoard(p, c, {x: 1, y: -1}, true);
    const [, SWCount] = this.walkBoard(p, c, {x: -1, y: 1}, true);
    if (NECount + SWCount >= this.victorySize) {
      this.winner = p;
      return p;
    }

    // Diagonal - NW/SE
    const [, NWCount] = this.walkBoard(p, c, {x: -1, y: -1}, true);
    const [, SECount] = this.walkBoard(p, c, {x: 1, y: 1}, true);
    if (NWCount + SECount >= this.victorySize) {
      this.winner = p;
      return p;
    }

    /**
     * TODO Look at the grouping around this coordinate
     * TODO Refactor this out into
     * We're looking for a box of size 'Math.ceil(victorySize / 2)'
     * More complex than a line - 'this' coordinate could be in the middle, on the edge and matching
     * neighbors could be dead ends rather than sides.
     * So strategy - walk in the cardinal directions (which we've already done)
     * If either axis is too short to win, we're done
     * If both axis are long enough then we need to step along the axis'
     * In theory, since this is Connect-4(ish), we'd never have anything 'above' us but doesn't make enough
     * difference implementation wise to be worth addressing.
     * If the total for both directions (plus our current space) is equal to or more than the winning stretch, game over
     * If both are long enough then we need to start painting a picture of the grid
     *
     * Sequence:
     * Step N/S , looking at E/W each time
     * E/W must each step be greater than or equal to the previous row
     *
     */

    // One of the cardinal directions is too short for a box
    if (NCount + SCount < this.victoryBoxSize || ECount + WCount < this.victoryBoxSize) {
      return null;
    }

    // Step vertically, but walk E/W each time
    const boxRows = 1; // We know we have one already
    if (NCount > 0) {

    }
    if (SCount > 0) {

    }



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
    const space = this.board[coords.x][coords.y];

    // If the space is empty, or doesn't match the player that came in, return null
    if (space !== p) {
      return [null, 0];
    }

    // Make sure we didn't step outside the board
    if (coords.x < 0 || coords.y < 0 || coords.x >= this.boardSize || coords.y >= this.boardSize) {
      return [null, 0];
    }

    // Space matches, but we're at the edge of the board. Return
    const nextSpace = {x: coords.x + step.x, y: coords.y + step.y} as Coordinate;
    if (nextSpace.x < 0 || nextSpace.y < 0 || nextSpace.x >= this.boardSize || nextSpace.y >= this.boardSize) {
      return [p, 1];
    }

    // Space matches, and we can keep going. Recurse
    const [, tally] = this.walkBoard(p, nextSpace, step);
    return [p, (skip) ? tally : tally + 1];
  }

  /**
   * boxStep will attempt to step over/down/back to try to discover a 'box' around
   * the originally requested coordinate
   *
   * Has a unique function as the logic is much different vs linear.
   *
   * @private
   */
  private boxStep() {
  }

}

export default Gameboard;