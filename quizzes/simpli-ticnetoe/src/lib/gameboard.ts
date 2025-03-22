/**
 * TicTacToe class implements the three functions specified in the test.
 *
 * Implementing in TS as that is the language most used by SimpliSafe and is the language
 * the sample class was in (or at least syntatically aligns with).  No language was
 * specified in details.
 *
 */
class TicTacToe {
  get gameName(): string {
    return this._gameName;
  }

  // board is a simple representation of the tic-tac-toe board
  // using string just to represent the typical TTT colors - Red and Black.  Unused will be blank.
  readonly board: string[][];

  // boardEmptySpots is a count of how many empty spaces we found
  readonly boardEmptySpots: number;

  // gameName is the name of this TicTacToe board
  readonly _gameName: string;

  // runes denote what characters align to what player/space type
  readonly runes = {
    'one': 'X',
    'two': 'O',
    'empty': 'E',
  };
  // readonly rune_player_two = 'O';
  // readonly rune_empty_space = 'E';

  // boardSize designates the expected board received
  readonly boardSize = 4;

  // Construct the board, enforcing minimum size
  // Expects a fully formed board - this class only loads/evaluates it doesn't create/update
  constructor(gameName: string, board: string[][]) {
    this._gameName = gameName;

    // Validate size of board
    if (board.length !== this.boardSize || board[0].length !== this.boardSize) {
      throw new Error(`board size invalid - both X and Y axis must be ${this.boardSize} long.`);
    }

    // Check for invalid runes and count empty squares by flattening the board
    // Basically just simplifies checking a few things down to simple regexes (which JS is efficient at)
    // Given the size of the board, just iterating over the whole thing as needed wouldn't actually cost much
    const runeSet = board.map(col => {
      return col.join('');
    }).join('');

    try {
      this.validateRuneSet(runeSet);
    } catch (e) {
      throw e;
    }

    // Count the empty board spots by just counting the rune for empty spaces
    const emptyRuneRegex = new RegExp(this.runes.empty, 'g');
    this.boardEmptySpots = (runeSet.match(emptyRuneRegex) ?? []).length;

    this.board = board;
  }

  /**
   * checkWinner evaluates the board to see if there is currently a winner
   *
   * @return string returns rune of winner, empty string if there is no winner
   */
  public checkWinner(): string {

  }

  /**
   * anyMovesLeft checks if there are any available spots on the board
   *
   * In this implementation, just has to check the empty spots variable we set in construction during validation.
   *
   * @return boolean true if there are spaces open, false if not
   */
  public anyMovesLeft(): boolean {
  }

  /**
   * isGameOver checks if either there's a winner or there are no moves left
   *
   * @return boolean true if game has ended (with winner or tie), false if there's plays left
   */
  public isGameOver(): boolean {
  }

  /**
   * compareCoordinates looks at the provided four coordinates and returns their value if all match
   *
   * If they do not match an empty string will be returned
   *
   * @private
   */
  private coordinatesMatch(...coords: number[][]): string {

  }

  /**
   * validateRuneSet throws an error if there's an issue with the board based on the actual list of runes
   *
   * @param runeSet the flattened board runeset
   * @private
   */
  private validateRuneSet(runeSet: string) {

  }
}

export default gameboard;