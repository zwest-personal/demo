import TicTacToe from '@src/models/tictactoe';

// Set up some data structures that we'd normally pull in from the CSV

// validBoard is a player 1 win, using diagonal
const validBoardName = 'valid';
const validBoardWinner = [
  ['X', 'O', 'E', 'X'],
  ['O', 'X', 'X', 'O'],
  ['X', 'O', 'X', 'O'],
  ['X', 'O', 'O', 'X'],
];
const validBoardTie = [
  ['X', 'O', 'O', 'X'],
  ['O', 'X', 'X', 'O'],
  ['X', 'O', 'O', 'O'],
  ['O', 'X', 'X', 'X'],
];

// invalidBoardOne will error because it has double winners
const invalidBoardName = 'invalid';
const invalidBoardOne = [
  ['X', 'X', 'E', 'X'],
  ['O', 'X', 'X', 'O'],
  ['O', 'O', 'X', 'E'],
  ['O', 'O', 'O', 'X'],
];

// invalidBoardTwo will error because it is the wrong size
const invalidBoardTwo = [
  ['X', 'X', 'E', 'X'],
  ['O', 'X', 'X', 'O'],
];

// invalidBoardThree will error because there is a discrepancy in number of plays
const invalidBoardThree = [
  ['X', 'O', 'E', 'X'],
  ['O', 'X', 'E', 'X'],
  ['E', 'E', 'X', 'O'],
  ['X', 'X', 'O', 'X'],
];

// invalidBoardFour will error due to an invalid rune
const invalidBoardFour = [
  ['Q', 'O', 'E', 'X'],
  ['O', 'X', 'E', 'X'],
  ['E', 'E', 'X', 'O'],
  ['O', 'X', 'O', 'X'],
];

describe('Valid TicTacToe', () => {
  const board = new TicTacToe(validBoardName, validBoardWinner);
  it('should show that moves are still available', () => {
    expect(board.anyMovesLeft()).toBe(true);
  });

  it('show that the game is over', () => {
    expect(board.isGameOver()).toBe(true);
  });

  it('show that player one won', () => {
    expect(board.checkWinner()).toBe('one');
  });

  const boardTwo = new TicTacToe(validBoardName, validBoardTie);
  it('show that the game is over', () => {
    expect(boardTwo.isGameOver()).toBe(true);
  });

  it('show that there are no moves left', () => {
    expect(boardTwo.anyMovesLeft()).toBe(false);
  });

  it('show that the game was a tie', () => {
    expect(boardTwo.checkWinner()).toBe('');
  });
});

describe('Invalid TicTacToe', () => {
  const board = new TicTacToe(invalidBoardName, invalidBoardOne);
  it('should show that moves are still available', () => {
    expect(board.anyMovesLeft()).toBe(true);
  });

  it('show that game was invalid - both players had a winning move', () => {
    expect(() => {
      board.checkWinner();
    }).toThrow();
  });

  it('show that game was invalid - board is wrong size', () => {
    expect(() => {
      new TicTacToe(invalidBoardName, invalidBoardTwo);
    }).toThrow();
  });

  it('show that game was invalid - number of plays is mismatched', () => {
    expect(() => {
      new TicTacToe(invalidBoardName, invalidBoardThree);
    }).toThrow();
  });

  it('show that the game was invalid - invalid rune found on board', () => {
    expect(() => {
      new TicTacToe(invalidBoardName, invalidBoardFour);
    }).toThrow();
  });
});