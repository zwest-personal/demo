import Gameboard from '@src/lib/gameboard';

/**
 * A 'Player' is any participant in the ticnetoe game
 *
 * This could be a human, bot, or remote service.
 *
 * This may change to an abstract class at some point.
 */
interface Player {
  // name is our player's name
  name: string;

  // play asks the Player to return a column number to drop their token into
  play(): number;
}

export default Player;