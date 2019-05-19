import {
  Piece,
  nullPiece,
  pawn,
  knight,
  bishop,
  rook,
  queen,
  king,
} from './pieces'
import * as ArrayHelpers from './array_helpers'

import { Color } from '../styles'

const black = 'black'
const white = 'white'

export interface Tile {
  rowIdx: number
  colIdx: number
}

interface PieceWithTile {
  tile: Tile
  piece: Piece
}

export const initialBoard = createBoard()

function createBoard(): Piece[][] {
  const board = []

  board.push(createBlackKingRow())
  board.push(createPawnRow(black))
  board.push(createNullRow())
  board.push(createNullRow())
  board.push(createNullRow())
  board.push(createNullRow())
  board.push(createPawnRow(white))
  board.push(createWhiteKingRow())

  return board
}

function createBlackKingRow(): Piece[] {
  return [
    new rook(black),
    new bishop(black),
    new knight(black),
    new king(black),
    new queen(black),
    new knight(black),
    new bishop(black),
    new rook(black),
  ]
}

function createWhiteKingRow(): Piece[] {
  return [
    new rook(white),
    new bishop(white),
    new knight(white),
    new queen(white),
    new king(white),
    new knight(white),
    new bishop(white),
    new rook(white),
  ]
}

function createPawnRow(color: string): Piece[] {
  return Array.apply(null, Array(8)).map(() => {
    return new pawn(color)
  })
}

function createNullRow(): Piece[] {
  return Array.apply(null, Array(8)).map(() => {
    return new nullPiece()
  })
}

export function playerPieces(board: Piece[][], color: string): PieceWithTile[] {
  const pieces = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j]
      if (piece.color === color) {
        const tile = { rowIdx: i, colIdx: j }
        const pieceWithTile = { piece, tile }
        pieces.push(pieceWithTile)
      }
    }
  }
  return pieces
}

export function getPiece(board: Piece[][], tile: Tile): Piece {
  return board[tile.rowIdx][tile.colIdx]
}

export function validMoves(piece: Piece, tile: Tile) {
  return piece.moves
    .map(move => {
      return { rowIdx: move[0] + tile.rowIdx, colIdx: move[1] + tile.colIdx }
    })
    .filter(move => {
      return isOnBoard(move)
    })
}

function isOnBoard(tile: Tile): boolean {
  return (
    tile.rowIdx >= 0 && tile.rowIdx < 8 && tile.colIdx >= 0 && tile.colIdx < 8
  )
}

export function updateBoard(
  oldBoard: Piece[][],
  fromTile: Tile,
  toTile: Tile
): Piece[][] {
  const { rowIdx: fromRow, colIdx: fromCol } = fromTile
  const { rowIdx: toRow, colIdx: toCol } = toTile
  const oldPiece = oldBoard[fromRow][fromCol]
  if (oldPiece.isPiece) {
    const newBoard = ArrayHelpers.deepDup(oldBoard)
    newBoard[toRow][toCol] = oldPiece
    newBoard[fromRow][fromCol] = new nullPiece()
    return newBoard
  } else {
    return oldBoard
  }
}

export function validMove(
  board: Piece[][],
  fromTile: Tile,
  toTile: Tile
): boolean {
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

export function sample(array: Piece[]): Piece | null {
  return array.length === 0 ? null : array[getRandomInt(array.length)]
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}
