'use client'

/**
 * New Game TSX
 *
 * Inputs for starting a new game
 */
export default function NewGame() {
  function newGame(formData: any) {
    const size = formData.get("board-size");
    const p1 = formData.get("player-1");
    const p2 = formData.get("player-2");
    alert(`Submit request to create game: ${size}, ${p1}, ${p2}`);
  }

  // TODO Change player types to combo box
  // TODO Pull board size limits from config
  return (
    <form action={newGame}>
      Board Size (0-30): <input name="board-size" type="text"/><br />
      Player 1 Type: <input name="player-1" type="text"/><br />
      Player 2 Type: <input name="player-2" type="text"/><br />
      <button type="submit">Begin</button>
    </form>
  );
}