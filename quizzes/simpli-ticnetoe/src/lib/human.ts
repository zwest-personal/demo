import Player from '@src/lib/interfaces/player';
import Gameboard from '@src/lib/gameboard';
import cliInput from '@src/helpers/cliInput';

class Human extends Player {
  public constructor(name: string, game: Gameboard) {
    super(`${name} (Human)`, game);
  }

  /**
   * play for a Human asks for a column to be inputted in the command line
   */
  public async play(): Promise<number> {
    // TODO Provide some helper info and check that they inputted a valid column
    let inputCol = -1;

    while (inputCol < 0 || inputCol > this.game.boardSize) {
      const playColumn = await cliInput(`Player ${this.name}, please enter your move (0-${this.game.boardSize}`);
      inputCol = +playColumn;
    }

    return inputCol;
  }

}

export default Human;