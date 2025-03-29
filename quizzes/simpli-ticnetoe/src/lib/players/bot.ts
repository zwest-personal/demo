import Player from '@src/lib/players/player';
import Gameboard from '@src/lib/gameboard';
import logger from '@src/common/logger';

// TODO Stub for bot, just wanted to separate out the RandoBot

/**
 * Bot tries to play smart - attempting to play near existing moves based on an pre-existing strategy
 */
class Bot extends Player {
  public constructor(name: string, game: Gameboard) {
    super(`${name} (Bot)`, game);
  }

  public play(): Promise<number> {
    // TODO Use 'strategy' type flags to determine how the bot decides to play
    return Promise.resolve(Math.floor(Math.random() * (this.game.boardSize + 1)));
  }
}

export default Bot;