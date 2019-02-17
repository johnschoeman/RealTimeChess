import Piece from './piece'
import NullPiece from './null_piece'
import * as ArrayHelpers from './array_helpers'

import { Color } from '../styles'

const black = 'black'
const white = 'white'

export const initialBoard = createBoard()

function createBoard() {
  const board = []
  let row = []
  for (j = 0; j < 8; j++) {
    row.push(new Piece(black))
  }
  board.push(row)
  row = []
  for (j = 0; j < 8; j++) {
    row.push(new Piece(black))
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
    row.push(new Piece(white))
  }
  board.push(row)
  row = []
  for (j = 0; j < 8; j++) {
    row.push(new Piece(white))
  }
  board.push(row)
  return board
}

export function updateBoard(oldBoard, fromTile, toTile) {
  const { rowIdx: fromRow, colIdx: fromCol } = fromTile
  const { rowIdx: toRow, colIdx: toCol } = toTile
  const oldPiece = oldBoard[fromRow][fromCol]
  if (oldPiece.isPiece) {
    newBoard = ArrayHelpers.deepDup(oldBoard)
    newBoard[toRow][toCol] = oldPiece
    newBoard[fromRow][fromCol] = new NullPiece()
    return newBoard
  } else {
    return oldBoard
  }
}

export function validMove(board, fromTile, toTile) {
  const { rowIdx: fromRowIdx, colIdx: fromColIdx } = fromTile
  const { rowIdx: toRowIdx, colIdx: toColIdx } = toTile
  const { moves, color } = board[fromRowIdx][fromColIdx]
  let availableTiles
  if (color === black) {
    availableTiles = moves.map(move => ({
      rowIdx: fromRowIdx + move[0],
      colIdx: fromColIdx + move[1],
    }))
  } else {
    availableTiles = moves.map(move => ({
      rowIdx: fromRowIdx - move[0],
      colIdx: fromColIdx + move[1],
    }))
  }
  return ArrayHelpers.contains(availableTiles, toTile)
}

export function generateRandomSelection() {
  return { rowIdx: getRandomInt(7), colIdx: getRandomInt(7) }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
