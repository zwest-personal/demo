import logger from '@src/common/logger';
import Gameboard from '@src/lib/gameboard';
import RandoBot from '@src/lib/players/randobot';
import delay from '@src/helpers/delay';

/**
 * Main game loop
 *
 * Likely to get wiped out eventually once all functionality is squared away.
 */
(async () => {
  logger.info('PickNEToe!');
  logger.info('Going with two bots');

  const board = new Gameboard(4, 4);
  const Player1 = new RandoBot('BOT1', board);
  const Player2 = new RandoBot('BOT2', board);

  let nextPlay = Player2;
  let play = 0;
  while (!board.isGameOver()) {
    nextPlay = (nextPlay === Player1) ? Player2 : Player1;
    await delay(200);
    play = await nextPlay.play();

    logger.info(`Player ${nextPlay.name} played: ${play}`);

    board.play(nextPlay, play);

    // TODO Add board output/snapshot display
    const winner = board.checkWinner();
    if (winner !== null) {
      logger.info('Winner!');
      logger.info(`${winner.name} won!`);
    }
  }

})();