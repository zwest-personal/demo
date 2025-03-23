import logger from '@src/lib/logger';

// TODO Add custom error class for board errors/validation errors?
// TODO Add custom error class for board layout errors?  Different than the board size/setup
// TODO Allow for multiple board errors to occur, just does one at a time right now

/**
 * TicTacToe class implements the three functions specified in the test.
 *
 * Implementing in TS as that is the language most used by SimpliSafe
 * and is the language the sample class was in (or at least syntactically
 * aligns with).  No language was specified in details.
 *
 */
class TicTacToe {
  // board is a simple representation of the tic-tac-toe board
  // using string just to represent the typical TTT colors - Red and Black.
  // Unused will be blank.
  private readonly board: string[][];

  // boardEmptySpots is a count of how many empty spaces we found
  public readonly boardEmptySpots: number;

  // gameName is the name of this TicTacToe board
  // Could do a getter/setter here instead
  public readonly gameName: string;

  // runes denote what characters align to what player/space type
  public readonly runes = {
    'one': 'X',
    'two': 'O',
    'empty': 'E',
  };
  // readonly rune_player_two = 'O';
  // readonly rune_empty_space = 'E';

  // boardSize designates the expected board received
  public readonly boardSize = 4;

  // Construct the board, enforcing minimum size
  // Expects a fully formed board - this class only loads/evaluates it doesn't create/update
  public constructor(gameName: string, board: string[][]) {
    this.gameName = gameName;

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

    // Run our validators
    this.validateRuneSet(runeSet);

    // Count the empty board spots by just counting the rune for empty spaces
    const emptyRuneRegex = new RegExp(this.runes.empty, 'g');
    this.boardEmptySpots = (runeSet.match(emptyRuneRegex) ?? []).length;

    this.board = board;
  }

  /**
   * checkWinner evaluates the board to see if there is currently a winner
   *
   * @return boolean was there a winner?
   * @return string rune of winner, if there was one
   */
  public checkWinner(): [boolean, string] {
    // Since this is always a fully formed 4x4 grid, we don't need to be particularly worried about optimization
    /*
        Win conditions:
        1. Vertical (4 possible)
        2. Horizontal (4 possible)
        3. Diagonal (2 possible)
        4. All Four Corners (1 possible)
        5. 2x2 box (9 possible)

        Entirely possible to directly check all possible solutions with direct array checks but would be a bit messy

        */
    const matchingSets = {
      '': 0, // Eats all the sets that do not match, for funsies
      [this.runes.one]: 0,
      [this.runes.two]: 0,
      [this.runes.empty]: 0, // Not used for anything after being filled
    };

    // #4 Corners - only one winning combo, check directly, no fanciness or iteration
    matchingSets[this.coordinatesMatch([0, 0], [0, 3], [3, 3], [3, 0])]++;

    // #3 Diagonal - only two winning combos, check directly as well
    matchingSets[this.coordinatesMatch([0, 0], [1, 1], [2, 2], [3, 3])]++;
    matchingSets[this.coordinatesMatch([0, 3], [1, 2], [2, 1], [3, 0])]++;

    // #1 Vertical - Step through each column, check if all the values are the same and are a player run
    // #2 Horizontal - Same, but rows
    for (let i = 0; i < this.boardSize; i++) {
      matchingSets[this.coordinatesMatch([i, 0], [i, 1], [i, 2], [i, 3])]++;
      matchingSets[this.coordinatesMatch([0, i], [1, i], [2, i], [3, i])]++;
    }

    // #5 2x2 -
    // There's only 9 possible winning combos with this (so you could really just do a list of coord sets to check)
    // but easier option is to just go first three rows/cols, and check the neighbors to right, down, and down-right
    for (let x = 0; x < this.boardSize - 1; x++) {
      for (let y = 0; y < this.boardSize - 1; y++) {
        matchingSets[this.coordinatesMatch([x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1])]++;
      }
    }

    // Check for an invalid edge case where the board had winning placements for both players
    if (matchingSets[this.runes.one] && matchingSets[this.runes.two]) {
      throw new Error('board outcome invalid - both player one and player two have winning plays.');
    }

    logger.debug('matchingSets: ', matchingSets);

    // No winner?  Return empty string
    if ((matchingSets[this.runes.one] + matchingSets[this.runes.two]) === 0) {
      return [false, ''];
    }

    // All good, return the actual winner
    return [true, ((matchingSets[this.runes.one]) ? 'one' : 'two')];
  }

  /**
   * anyMovesLeft checks if there are any available spots on the board
   *
   * In this implementation, just has to check the empty spots variable we set in construction during validation.
   *
   * @return boolean true if there are spaces open, false if not
   */
  public anyMovesLeft(): boolean {
    return this.boardEmptySpots > 0;
  }

  /**
   * isGameOver checks if either there's a winner or there are no moves left
   *
   * @return boolean true if game has ended (with winner or tie), false if there's plays left
   */
  public isGameOver(): boolean {
    return !!this.checkWinner() || !this.anyMovesLeft();
  }

  /**
   * compareCoordinates looks at the provided four coordinates and returns their value if all match
   *
   * If they do not match an empty string will be returned
   *
   * @private
   */
  private coordinatesMatch(...coords: number[][]): string {
    let commonRune = '';
    logger.debug('Check coords: ', coords);
    for (const v of coords) {
      if (v.length !== 2) {
        throw new Error('checkCoordinates error - did not get a valid x/y pair');
      }

      const boardValue = this.board[v[0]][v[1]];

      // Return immediately if any are empty
      if (boardValue === this.runes.empty) {
        return '';
      }

      if (commonRune === '') commonRune = boardValue;

      if (boardValue !== commonRune) {
        return '';
      }
    }

    logger.debug('match! ', coords);

    return commonRune;
  }

  /**
   * validateRuneSet throws an error if there's an issue with the board based on the actual list of runes
   *
   * @param runeSet the flattened board loaded as a string of runes
   * @private
   */
  private validateRuneSet(runeSet: string) {
    // Check if there's any characters other than our three runes
    const validRuneRegex = new RegExp(`[${this.runes.one}${this.runes.two}${this.runes.empty}]`, 'g');
    if ((runeSet.match(validRuneRegex) ?? []).length < (this.boardSize ** 2)) {
      throw new Error('board map invalid - bad runes found - ' +
        `only ${this.runes.one}, ${this.runes.two}, and ${this.runes.empty} are permitted in board map`);
    }

    // Check for error case - player one should have made the same number of plays or one additional play compared
    // to player two.
    const playerOneRegex = new RegExp(this.runes.one, 'g');
    const playerTwoRegex = new RegExp(this.runes.two, 'g');
    const playerOneRunes = (runeSet.match(playerOneRegex) ?? []).length;
    const playerTwoRunes = (runeSet.match(playerTwoRegex) ?? []).length;
    if (playerOneRunes !== playerTwoRunes &&
      playerOneRunes - 1 !== playerTwoRunes) {
      throw new Error('board map invalid - player one should have the same or one more move completed than player two');
    }
  }
}

export default TicTacToe;