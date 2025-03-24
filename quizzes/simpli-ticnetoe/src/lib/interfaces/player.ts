import Gameboard from '@src/lib/gameboard';

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

  /**
   * TODO Conceptually the Gameboard taking in the Players makes a bit more sense, so may re-jigger.
   *
   * @param name string player name
   * @param game Gameboard gameboard object
   */
  protected constructor(name: string, game: Gameboard) {
    this.game = game;
    this.name = name;
  }

  // play asks the Player to return a column number to drop their token into
  public abstract play(): Promise<number>;
}

export default Player;