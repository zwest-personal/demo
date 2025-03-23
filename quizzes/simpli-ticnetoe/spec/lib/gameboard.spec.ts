import Gameboard from '@src/lib/gameboard';

const boardSize = 6;

describe('Gameboard', () => {
  let board: Gameboard;

  it('should create Gameboard successfully', () => {
    expect(() => {
      board = new Gameboard(boardSize);
    }).not.toThrow();
  });

  it('should have moves left as none have been taken', () => {
    expect(board.anyMovesLeft()).toBe(true);
  });

});