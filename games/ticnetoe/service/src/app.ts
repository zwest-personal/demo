import logger from './common/logger';
import Gameboard from '@src/lib/gameboard';
import RandoBot from '@src/lib/players/randobot';
import delay from '@src/helpers/delay';
import InvalidPlayError from '@src/types/errors/InvalidPlayError';

/**
 * Main game loop when running via CLI
 *
 * Going to be steadily refactored away into other files
 */
(async () => {
  logger.info('PickNEToe!');
  logger.info('Going with two bots');

  const board = new Gameboard(60, 10);
  const Player1 = new RandoBot('XEDBOT', board);
  const Player2 = new RandoBot('OLACKBOT', board);

  let nextPlay = Player2;
  let play = 0;
  while (!board.isGameOver()) {
    nextPlay = (nextPlay === Player1) ? Player2 : Player1;
    await delay(10);

    try {
      play = await nextPlay.play();

      logger.info(`Player ${nextPlay.name} played: ${play}`);

      board.play(nextPlay, play);
    } catch (e) {
      logger.info('Invalid play, retrying...');
      nextPlay = (nextPlay === Player1) ? Player2 : Player1;
      continue;
    }

    // TODO Add board output/snapshot display
    const winner = board.checkWinner();
    if (winner !== null) {
      logger.info('Winner!');
      logger.info(`${winner.name} won!`);
      logger.info('Final Board: \n'+board.toString());
    } else if (!board.movesLeft()) {
      logger.info('Draw!');
      logger.info('Game ended in a draw, try again!');
      logger.info('Final Board: \n'+board.toString());
    }
  }

})();