'use client'

/**
 * New Game TSX
 *
 * Inputs for starting a new game
 */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormRange from 'react-bootstrap/FormRange'

export default function NewGame() {
  function newGame(formData: any) {
    alert(`Formdata: ` + formData.toString());
  }

  // TODO Change player types to combo box
  // TODO Pull board size limits from config
  return (
    <Form action={newGame}>
      <Form.Group className="mb-3" controlId="formBoardSize">
        <Form.Label>Board Size</Form.Label>
        <Form.Range min="6" max="50" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formWinningLength">
        <Form.Label>Winning Length</Form.Label>
        <Form.Range min="3" max="25" />
      </Form.Group>

      <Form.Select aria-label="Player 1">
        <option>Select Player 1 Type</option>
        <option value="1">Human</option>
        <option value="2">RandoBot</option>
        <option value="3">TryBot</option>
      </Form.Select>

      <Form.Select aria-label="Player 2">
        <option>Select Player 2 Type</option>
        <option value="1">Human</option>
        <option value="2">RandoBot</option>
        <option value="3">TryBot</option>
      </Form.Select>

      <Button as="input" type="submit" value="Start Game" />
    </Form>
  );
}