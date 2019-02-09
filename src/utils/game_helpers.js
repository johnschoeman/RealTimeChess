import Piece from './piece'
import NullPiece from './null_piece'
import { deepDup } from './array_helpers'

import { Color } from '../styles'

export const initialBoard = createBoard()

function createBoard() {
  const board = []
  let row = []
  for (j = 0; j < 8; j++) {
    row.push(new Piece(Color.pieceBlack))
  }
  board.push(row)
  row = []
  for (j = 0; j < 8; j++) {
    row.push(new Piece(Color.pieceBlack))
  }
  board.push(row)
  for (i = 0; i < 4; i++) {
    row = []
    let nullPiece
    for (j = 0; j < 8; j++) {
      nullPiece = new NullPiece()
      row.push(new NullPiece())
    }
    board.push(row)
  }
  row = []
  for (j = 0; j < 8; j++) {
    row.push(new Piece(Color.pieceWhite))
  }
  board.push(row)
  row = []
  for (j = 0; j < 8; j++) {
    row.push(new Piece(Color.pieceWhite))
  }
  board.push(row)
  return board
}

export function updateBoard(oldBoard, from_x, from_y, to_x, to_y) {
  const oldPiece = oldBoard[from_y][from_x]
  if (oldPiece.isPiece) {
    newBoard = deepDup(oldBoard)
    newBoard[to_y][to_x] = oldPiece
    newBoard[from_y][from_x] = new NullPiece()
    return newBoard
  } else {
    return oldBoard
  }
}
