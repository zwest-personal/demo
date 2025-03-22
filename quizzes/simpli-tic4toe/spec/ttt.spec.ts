import TicTacToe from "@src/ttt";
import {describe, expect, test} from '@jest/globals';

// Set up some data structures that we'd normally pull in from the CSV

// validBoard is a player 1 win, using diagonal
const validBoardName = 'valid'
const validBoardWinner = [
    [ 'X', 'O', 'E', 'X' ],
    [ 'O', 'X', 'X', 'O' ],
    [ 'X', 'O', 'X', 'O' ],
    [ 'X', 'O', 'O', 'X' ],
]
const validBoardTie = [
    [ 'X', 'O', 'O', 'X' ],
    [ 'O', 'X', 'X', 'O' ],
    [ 'X', 'O', 'X', 'O' ],
    [ 'O', 'X', 'O', 'X' ],
]

// invalidBoard will error because it has double winners
const invalidBoardName = 'invalid'
const invalidBoardOne = [
    [ 'X', 'X', 'E', 'X' ],
    [ 'O', 'X', 'X', 'O' ],
    [ 'O', 'O', 'X', 'E' ],
    [ 'O', 'O', 'O', 'X' ],
]


describe('Valid TicTacToe', () => {
    const board = new TicTacToe(validBoardName, validBoardWinner)
    it('should show that moves are still available', () => {
        expect(board.anyMovesLeft()).toBe(true);
    });

    it('show that the game is over', () => {
        expect(board.isGameOver()).toBe(true);
    })

    it('show that player one won', () => {
        expect(board.checkWinner()).toBe('one');
    })
})

describe('Invalid TicTacToe', () => {
    const board = new TicTacToe(invalidBoardName, invalidBoardOne)
    it('should show that moves are still available', () => {
        expect(board.anyMovesLeft()).toBe(true);
    });

    it('show that the game is over', () => {
        expect(board.isGameOver()).toBe(true);
    })

    it('show that game was invalid - both players had a winning move', () => {
        expect(board.checkWinner()).toThrowError();
    })
})