import Gameboard from '@src/lib/gameboard';
import RandoBot from '@src/lib/players/randobot';
import InvalidBoardError from '@src/types/errors/InvalidBoardError';
import InvalidPlayError from '@src/types/errors/InvalidPlayError';

const boardSize = 8;
const victorySize = 4;

describe('Gameboard', () => {
  let board: Gameboard;

  it('should create Gameboard successfully', () => {
    expect(() => {
      board = new Gameboard(boardSize, victorySize);
    }).not.toThrow();
  });

  it('should fail to create Gameboard', () => {
    expect(() => {
      board = new Gameboard(boardSize, 15);
    }).toThrow();
  });

  // Prep the game board prior to remaining tests
  beforeEach(() => {
    board = new Gameboard(boardSize, victorySize);
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

  let Player1: RandoBot;
  let Player2: RandoBot;

  // Set up players for remaining tests
  beforeEach(() => {
    Player1 = new RandoBot('P1', board);
    Player2 = new RandoBot('P2', board);
  });

  it('should be able to play a few moves', () => {
    board.play(Player1, 0);
    expect(board.movesLeft()).toBe(boardSize ** 2 - 1);

    board.play(Player2, 0);
    expect(board.movesLeft()).toBe(boardSize ** 2 - 2);
  });

  it('should trigger a win for P1 - horizontal', () => {
    // Board doesn't require alternating players at this time, but could in time
    board.play(Player1,0);
    board.play(Player1,1);
    board.play(Player1,2);
    board.play(Player1,3);
    expect(board.checkWinner()).toBe(Player1);
  });

  it('should trigger a win for P2 - vertical', () => {
    // Board doesn't require alternating players at this time, but could in time
    board.play(Player1,0);
    board.play(Player2,1);
    board.play(Player2,1);
    board.play(Player2,1);
    board.play(Player2,1);
    expect(board.checkWinner()).toBe(Player2);
  });

  it('should trigger a win for P1 - diagonal', () => {
    board.play(Player1,0);
    board.play(Player2,1);
    board.play(Player1,1);
    board.play(Player2,2);
    board.play(Player2,2);
    board.play(Player1,2);
    board.play(Player2,3);
    board.play(Player2,3);
    board.play(Player2,3);
    board.play(Player1,3);

    expect(board.checkWinner()).toBe(Player1);
  });

  it('should trigger a win for P2 - box', () => {
    board.play(Player2,0);
    board.play(Player2,0);
    board.play(Player2,1);
    board.play(Player2,1);

    expect(board.checkWinner()).toBe(Player2);
  });
});

describe('Gameboard Errors', () => {
  it('should trigger a play error', () => {
    const board = new Gameboard(boardSize, boardSize);
    const player = new RandoBot('P1', board);

    expect(() => {
      board.play(player, -1);
    }).toThrow(InvalidPlayError);

    expect(() => {
      board.play(player, boardSize + 1);
    }).toThrow(InvalidPlayError);
  });

  it('should trigger a board error', () => {
    expect(() => {
      new Gameboard(1, 0);
    }).toThrow(InvalidBoardError);
  });
});