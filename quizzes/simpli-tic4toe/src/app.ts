/**
 * Main executable for testing the class.
 *
 * This is a bit messy but would also be the first thing to toss
 * if the TTT class was used for a real game setup (with a UI or inputs or something).
 * So I didn't want to toss tons of extra time at overthinking it.
 */


import * as fs from 'fs';
import * as path from 'path';
import TicTacToe from '@src/models/tictactoe';
import {parse} from 'csv-parse';
import logger from '@src/lib/logger';

const csvFilePath = path.resolve(__dirname, '../data/boards.csv');
const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf-8'});

// Simple iteration for the run -
// Parse each 'board' defined in the CSV
// Send it into the TT class
// Check if the game is over, and if it is who the winner was
(async () => {
  const records = parse(fileContent, {
    columns: false,
    skip_empty_lines: false,
    relax_column_count: true,
  });
  const result: string[][] = await records.toArray() as string[][];

  for (let r = 0; r < result.length; r++) {
    if (result[r][0].startsWith('-')) {
      logger.info('----------------------------------------');
      const nextBoard = result[r + 1][0];
      const board: string[][] = [];
      board.push(result[r + 2]);
      board.push(result[r + 3]);
      board.push(result[r + 4]);
      board.push(result[r + 5]);

      // TODO If the board has too few rows then the above will break

      try {
        const newBoard = new TicTacToe(nextBoard, board);
        const [hasWinner, winner] = newBoard.checkWinner();

        // Process our results
        if (hasWinner) {
          logger.info(`Winner of "${newBoard.gameName}" was: \n  Player ${winner}`);
        } else if (newBoard.anyMovesLeft()) {
          logger.info(`Winner of "${newBoard.gameName}" was: \n  There was no winner,` +
            `game has ${newBoard.boardEmptySpots} free spaces left.`);
        } else {
          logger.info(`Winner of "${newBoard.gameName}" was: \n  There was no winner, no empty spaces left.`);
        }
      } catch (e) {
        logger.info(`board error for "${nextBoard}":\n  ${(e as Error).message}`);
      }
    }
  }
})();