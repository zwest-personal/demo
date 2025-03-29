import Gameboard, {Coordinate} from '@src/lib/gameboard';
import {Bitmap, createBitmap, printBitmap, updateBitmap} from '@src/helpers/bitmap';
import logger from '@src/common/logger';

/**
 * A 'Player' is any participant in the ticnetoe game
 *
 * This could be a human, bot, or remote service.
 *
 * Updated from interface to abstract class due to some shared behaviors I wanted.
 *
 */
abstract class Player {
  // game points to the Gameboard this Bot is playing on
  protected readonly game: Gameboard;

  // name is our player's name
  public readonly name: string;

  // map is our own bitmap copy of the gameboard
  public readonly map: Bitmap;

  /**
   * TODO Conceptually the Gameboard taking in the Players makes a bit more sense, so may re-jigger.
   *
   * @param name string player name
   * @param game Gameboard gameboard object
   */
  protected constructor(name: string, game: Gameboard) {
    this.game = game;
    this.name = name;
    this.map = createBitmap(this, game.board);
  }

  /**
   *   play asks the Player to return a column number to drop their token into
   *
   *   @return Promise<number> column the player chose to play
   */
  public abstract play(): Promise<number>;

  /**
   * verifiedPlay is called by the Gameboard to tell the Player their move was valid and to update
   * their bitmap
   *
   * @param c Coordinate Point to update in bitmap
   */
  public verifiedPlay(c: Coordinate): void {
    updateBitmap(this.map, c.row, c.col);
    printBitmap(this.map);
  }

  /**
   * rune just returns a symbol for 'this' player, to help display the board
   *
   * @return string rune
   */
  public rune(): string {
    return this.name.charAt(0);
  }
}

export default Player;