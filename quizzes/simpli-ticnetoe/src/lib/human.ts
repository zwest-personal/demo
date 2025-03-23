import Player from '@src/lib/interfaces/player';

class Human implements Player {
  /**
   * play for a Human will prompt the player to enter a field in the command line
   */
  public play(): number {
    // TODO Needs to know how many columsn there are

    return 0;
  }
}

export default Human;