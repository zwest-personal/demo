'use client'

/**
 * New Game TSX
 *
 * Inputs for starting a new game
 */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import BoardService from "@/app/services/board";

// TODO Get Config from backend to align restrictions

const board = new BoardService()


export default function NewGame() {
  const [boardSize, updateBoardSize] = useState('6')
  const [winningSize, updateWinningSize] = useState('3')

  const defaults = board.getDefaults()
  console.log(defaults)

  function newGame(formData: any) {
    // TODO Prep submission to create board
    console.log(formData)

  }

  // TODO Pull board size limits from config
  return (
    <Form action={newGame}>
      <Form.Group className="mb-6" controlId="formBoardSize">
        <Form.Label>Board Size: {boardSize}</Form.Label>
        <Form.Range min="6" max="50" value={boardSize} onChange={e => updateBoardSize(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-6" controlId="formWinningLength">
        <Form.Label>Winning Length: {winningSize}</Form.Label>
        <Form.Range min="3" max="25" value={winningSize} onChange={e => updateWinningSize(e.target.value)}/>
      </Form.Group>

      <Form.Select className="mb-6" aria-label="Player 1">
        <option>Select Player 1 Type</option>
        <option value="human">Human</option>
        <option value="randobot">RandoBot</option>
        <option value="bot">SortaTriesBot</option>
      </Form.Select>

      <Form.Select className="mb-6" aria-label="Player 2">
        <option>Select Player 2 Type</option>
        <option value="human">Human</option>
        <option value="randobot">RandoBot</option>
        <option value="bot">SortaTriesBot</option>
      </Form.Select>

      <Button as="input" type="submit" value="Start Game"/>
    </Form>
  );
}