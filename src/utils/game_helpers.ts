import { Chess, ChessInstance, ShortMove, Square } from "chess.js"

import {
  PieceType,
  Side,
  empty,
  pawn,
  knight,
  bishop,
  rook,
  queen,
  king,
} from "./pieces"
import * as ArrayHelpers from "./array_helpers"

export const black: Side = "black"
export const white: Side = "white"

type BoardRow = PieceType[]
export type Board = BoardRow[]

export interface Tile {
  rowIdx: number
  colIdx: number
}

export interface ANTile {
  rank: string
  file: string
  square: Square
}

interface PieceWithTile {
  tile: Tile
  piece: PieceType
}

const initialBoardFenCode =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

export const createBoard = (fenCode: string = initialBoardFenCode): Board => {
  const boardString = fenCode.split(" ")[0]
  return boardString.split("/").map(rank => {
    return rank.split("").flatMap(fenChar => {
      return fenCharToPieceSubArray(fenChar)
    })
  })
}

function fenCharToPieceSubArray(char: string): PieceType[] {
  if (isNaN(Number(char))) {
    return [createPieceByFenCode(char)]
  } else {
    return Array<PieceType>(Number(char)).fill(new empty())
  }
}

export const initialBoard = createBoard(initialBoardFenCode)

function createPieceByFenCode(fenCode: string): PieceType {
  switch (fenCode) {
    case "r": {
      return new rook(black)
    }
    case "n": {
      return new knight(black)
    }
    case "b": {
      return new bishop(black)
    }
    case "q": {
      return new queen(black)
    }
    case "k": {
      return new king(black)
    }
    case "p": {
      return new pawn(black)
    }
    case "R": {
      return new rook(white)
    }
    case "N": {
      return new knight(white)
    }
    case "B": {
      return new bishop(white)
    }
    case "Q": {
      return new queen(white)
    }
    case "K": {
      return new king(white)
    }
    case "P": {
      return new pawn(white)
    }
    default: {
      return new empty()
    }
  }
}

export const tileRCtoAN = (tile: Tile): ANTile => {
  const colToFile = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const rowToRank = ["8", "7", "6", "5", "4", "3", "2", "1"]

  const rank = rowToRank[tile.rowIdx]
  const file = colToFile[tile.colIdx]
  const square: Square = (file + rank) as Square
  return {
    rank,
    file,
    square,
  }
}

export const tileANtoRC = (tile: ANTile) => {
  const fileToCol: { [key: string]: number } = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
  }
  const rankToRow: { [key: string]: number } = {
    "8": 0,
    "7": 1,
    "6": 2,
    "5": 3,
    "4": 4,
    "3": 5,
    "2": 6,
    "1": 7,
  }

  return {
    colIdx: fileToCol[tile.file],
    rowIdx: rankToRow[tile.rank],
  }
}

export function playerPieces(
  board: PieceType[][],
  side: Side
): PieceWithTile[] {
  const pieces = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j]
      if (piece.side === side) {
        const tile = { rowIdx: i, colIdx: j }
        const pieceWithTile = { piece, tile }
        pieces.push(pieceWithTile)
      }
    }
  }
  return pieces
}

export function getPiece(board: Board, tile: Tile): PieceType {
  return board[tile.rowIdx][tile.colIdx]
}

export function validMoves(piece: PieceType, tile: Tile): Array<Tile> {
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
  oldBoard: Board,
  fromTile: Tile,
  toTile: Tile
): Board {
  const { rowIdx: fromRow, colIdx: fromCol } = fromTile
  const { rowIdx: toRow, colIdx: toCol } = toTile
  const oldPiece = oldBoard[fromRow][fromCol]
  if (oldPiece.isPiece) {
    const newBoard = ArrayHelpers.deepDup(oldBoard)
    newBoard[toRow][toCol] = oldPiece
    newBoard[fromRow][fromCol] = new empty()
    return newBoard
  } else {
    return oldBoard
  }
}

export function validMove(
  board: Board,
  fromTile: Tile,
  toTile: Tile,
  side: Side
): boolean {
  const fen = generateFen(board, side)
  const chessClient: ChessInstance = new Chess(fen)
  const from: Square = tileRCtoAN(fromTile).square
  const to: Square = tileRCtoAN(toTile).square

  const shortMove: ShortMove = { from, to }
  const move = chessClient.move(shortMove)

  return move != null ? true : false
}

export const generateFen = (board: Board, side: Side = "white"): string => {
  const fenChars: string[] = board.map(rank => {
    return rank
      .map(file => {
        return file.fenCode
      })
      .join("")
  })

  const sideChar = side === "white" ? "w" : "b"

  return (
    fenChars
      .map(rank => {
        return rankToFen(rank)
      })
      .join("/") + ` ${sideChar} KQkq - 0 1`
  )
}

export const rankToFen = (rank: string): string => {
  if (rank.length === 0) {
    return ""
  }
  const head = rank[0]
  const tail = rank.slice(1)
  const nextFen: string = rankToFen(tail)
  if (head === "0") {
    const nextHead: number = Number(nextFen[0])
    if (isNaN(nextHead)) {
      return "1" + nextFen
    } else {
      const nextTail: string = nextFen.slice(1)
      return (nextHead + 1).toString() + nextTail
    }
  } else {
    return head + nextFen
  }
}

export const boardToAscii = (board: Board): string => {
  return board
    .map(rank => {
      return rank
        .map(piece => {
          return piece.fenCode
        })
        .join(" ")
    })
    .join("\n")
}
