import Player from '@src/lib/players/player';
import Gameboard from '@src/lib/gameboard';
import logger from '@src/common/logger';

/**
 * RandoBot has no strategy - it just drops the token in any column at random.
 *
 * If the column is maxed out it'll inevitably just try again.
 *
 * Not exactly a challenging opponent on any large board, but handy for testing mechanisms
 * and for laughs.
 */
class RandoBot extends Player {
  public constructor(name: string, game: Gameboard) {
    super(`${name} (RandoBot)`, game);
  }

  /**
   * play for a RandoBot will just pick a column to drop the token into at random
   */
  public play(): Promise<number> {
    return Promise.resolve(Math.floor(Math.random() * (this.game.boardSize + 1)));
  }
}

export default RandoBot;