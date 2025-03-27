import Gameboard from '@src/lib/gameboard';
import Bot from '@src/lib/bot';

const boardSize = 6;

describe('Gameboard', () => {
  let board: Gameboard;

  it('should create Gameboard successfully', () => {
    expect(() => {
      board = new Gameboard(boardSize, 6);
    }).not.toThrow();
  });

  it('should fail to create Gameboard', () => {
    expect(() => {
      board = new Gameboard(boardSize, 15);
    }).toThrow();
  });

  // Prep the game board prior to remaining tests
  beforeEach(() => {
    board = new Gameboard(boardSize, boardSize);
  });

  it('should have moves left as none have been taken', () => {
    expect(board.movesLeft()).toBe(boardSize ** 2);
  });

  it('should cause an error if we check a coordinate outside the size', () => {
    expect(() => {
      // @ts-expect-error Testing private function
      board.compareCoordinates(-1, 0);
    }).toThrow();

    expect(() => {
      // @ts-expect-error Testing private function
      board.compareCoordinates(2, boardSize + 1);
    }).toThrow();
  });

  let Player1: Bot;
  let Player2: Bot;
  
  // Set up players for remaining tests
  beforeEach(() => {
    Player1 = new Bot('P1', board);
    Player2 = new Bot('P2', board);
  });

  it('should be able to play a few moves', () => {
    board.play(Player1, 0);
    expect(board.movesLeft()).toBe(boardSize ** 2 - 1);

    board.play(Player2, 0);
    expect(board.movesLeft()).toBe(boardSize ** 2 - 2);
  });
});