import Player from '@src/lib/interfaces/player';
import Gameboard from '@src/lib/gameboard';
import logger from '@src/common/logger';

class Bot extends Player {
  public constructor(name: string, game: Gameboard) {
    super(`${name} (Bot)`, game);
  }

  /**
   * play for a Bot will just pick a column to drop the token into at random
   *
   * Could be made more competitive by trying to drop near existing tokens
   */
  public play(): Promise<number> {
    return Promise.resolve(Math.floor(Math.random() * (this.game.boardSize + 1)));
  }
}

export default Bot;