import Player from '@src/lib/interfaces/player';
import logger from '@src/common/logger';

import InvalidPlayError from '@src/types/errors/InvalidPlayError';
import InvalidBoardError from '@src/types/errors/InvalidBoardError';

// min and max values for board size and victory sets
const minVictorySize = 3, minBoardSize = 3;
const maxVictorySize = 8, maxBoardSize = 10;

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
    const winner = this.checkWinningCoordinate(this.heightMap[column]-1, column);
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
  private compareCoordinates(...coords: number[][]): Player | null {
    let player;
    logger.debug('Check coords: ', coords);

    for (const v of coords) {
      if (v.length !== 2) {
        throw new Error('checkCoordinates error - did not get a valid x/y pair');
      }

      const boardValue = this.board[v[0]][v[1]];

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
   * @param x x/row coordinate
   * @param y y/col coordinate
   * @private
   * @return Player winning player, or null
   */
  private checkWinningCoordinate(x: number, y: number): Player | null {
    // TODO Corners win, no matter the victory size, but only if we're *in* a corner

    // TODO Iterate through the conditions:
    // Vertical - needs to have a neighbor above or below
    // Horizontal - needs to have a matching neighbor east or west
    // Square - toughest to match, but needs to have at least one matching neighbor in a cardinal direction
    // Diagonal - needs to have a matching neighbor in a non-cardinal direction

    return null;
  }

  /**
   * linearStep goes from the requested point along an x or y axis
   * @private
   */
  private linearStep() {}

  /**
   * boxStep will attempt to step over/down/back to try to discover a 'box' around
   * the originally requested coordinate
   *
   * @private
   */
  private boxStep() {}

}

export default Gameboard;