import Player from '@src/lib/interfaces/player';

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
  public readonly boardSize: number;

  private victorySize: number;
  private emptySpaces: number;

  public constructor(size: number) {
    this.boardSize = size;

    // As with the 'quiz' board, victory
    this.victorySize = 4;

    this.emptySpaces = this.boardSize ** 2;
  }

  public checkWinner(): [boolean, Player | undefined] {
    return [false, undefined];
  }

  /**
   * anyMovesLeft checks if there are any available spots on the board
   *
   * @return boolean true if there are spaces open, false if not
   */
  public anyMovesLeft(): boolean {
    return this.emptySpaces > 0;
  }

  /**
   * isGameOver checks if either there's a winner or there are no moves left
   *
   * @return boolean true if game has ended (with winner or tie), false if there's plays left
   */
  public isGameOver(): boolean {
    return !!this.checkWinner() || !this.anyMovesLeft();
  }
}

export default Gameboard;