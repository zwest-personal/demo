import RandoBot from '@src/lib/players/randobot';
import Gameboard from '@src/lib/gameboard';

const boardSize = 6;

// Just need a basic gameboard in this case
const game = new Gameboard(boardSize, boardSize);
describe('Player - RandoBot', () => {
  const player = new RandoBot('TEST', game);

  it('should play a valid column', () => {
    // Play 100 times, get max/min
    let min = 0, max = boardSize - 1;
    [...Array(100).keys()].forEach(async () => {
      const result = await player.play();
      min = Math.min(min, result);
      max = Math.max(max, result);
    });

    // Min should still be 0
    expect(min).toBe(0);

    // Max should still be the boardSize
    expect(max).toBeLessThanOrEqual(boardSize);
  });

});