import Player from '@src/lib/interfaces/player';
import Gameboard from '@src/lib/gameboard';
import logger from '@src/common/logger';

class Bot implements Player {
  // game points to the Gameboard this Bot is playing on
  private readonly game: Gameboard;

  // name is our player's name
  public readonly name: string;

  public constructor(game: Gameboard) {
    this.name = 'BottyBoBotty';
    this.game = game;
  }

  /**
   * play for a Bot will just pick a column to drop the token into at random
   *
   * Could be made more competitive by trying to drop near existing tokens
   */
  public play(): number {
    return Math.floor(Math.random() * (this.game.boardSize + 1));
  }
}

export default Bot;