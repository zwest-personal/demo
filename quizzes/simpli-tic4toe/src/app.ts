import * as fs from "fs";
import * as path from "path";
import TicTacToe from "@src/ttt";
import {parse} from 'csv-parse';

// Load @src/data/boards/csv
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
    const result = await records.toArray()

    for (let r = 0; r < result.length; r++) {
        if (result[r][0] === '-') {
            let boardName = result[r + 1][0]
            let board: string[][] = [];
            board.push(result[r + 2])
            board.push(result[r + 3])
            board.push(result[r + 4])
            board.push(result[r + 5])

            try {
                let newBoard = new TicTacToe(boardName, board)
                let result = newBoard.checkWinner()

                if (!result) {
                    console.log(`Winner of "${boardName}" was: \n  There was no winner, no empty spaces left`)
                } else {
                    console.log(`Winner of "${boardName}" was: \n  Player ${newBoard.checkWinner()}`)
                }
            } catch (e) {
                console.log(`board error for "${boardName}":\n  ${e.message}`)
            }
        }
    }
})();


// TODO Iterate over each, loading them into the TTT class

// TODO Run check - Are there plays left?  AKA are there empties left.
// TODO Run check - Is the game over?  Was a winning combo found?
// TODO Run check - Who was the winner?  Will note if it was a tie, will error if both players 'won'
