import {
  ChessInstance,
  ShortMove,
  Square,
  Piece,
  Empty,
  Move,
  Side,
  black,
  white,
} from "../utils/chess/chess"

import Chess from "./chess/chess"
import { empty, pawn, knight, bishop, rook, queen, king } from "./pieces"
import * as ArrayHelpers from "./array_helpers"

export type BoardRow = (Piece | Empty)[]
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
  piece: Piece
}

const FileToCol: { [key: string]: number } = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
}

const RankToRow: { [key: string]: number } = {
  "8": 0,
  "7": 1,
  "6": 2,
  "5": 3,
  "4": 4,
  "3": 5,
  "2": 6,
  "1": 7,
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

function fenCharToPieceSubArray(char: string): BoardRow {
  if (isNaN(Number(char))) {
    return [createPieceByFenCode(char)]
  } else {
    return Array<Piece | Empty>(Number(char)).fill(new empty())
  }
}

function createPieceByFenCode(fenCode: string): Piece | Empty {
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

export const winner = (board: Board): Side | null => {
  const kings: Array<Piece | Empty> = board.flatMap((rank: BoardRow) => {
    return rank.filter((piece: Piece | Empty): boolean => {
      return piece.kind === "king"
    })
  })

  const kingColors: Array<Side | null | undefined> = kings.map(
    (piece: Piece | Empty) => {
      return piece.side
    }
  )

  if (kingColors.includes(black) && kingColors.includes(white)) {
    return null
  } else if (kingColors.includes(black)) {
    return black
  } else {
    return white
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

export const tileANtoRC = (tile: ANTile): Tile => {
  return {
    colIdx: FileToCol[tile.file],
    rowIdx: RankToRow[tile.rank],
  }
}

export const squareToRCTile = (square: Square): Tile => {
  const [file, rank] = square.split("")
  return {
    colIdx: FileToCol[file],
    rowIdx: RankToRow[rank],
  }
}

export function playerPieces(board: Board, side: Side): PieceWithTile[] {
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

export function getPiece(board: Board, tile: Tile): Piece | Empty {
  return board[tile.rowIdx][tile.colIdx]
}

export function updateBoardWithMove(oldBoard: Board, move: Move): Board {
  const moveToRCTiles = (move: Move) => {
    const { from, to } = move
    const fromTile: Tile = squareToRCTile(from)
    const toTile: Tile = squareToRCTile(to)
    return { fromTile, toTile }
  }
  const { fromTile, toTile } = moveToRCTiles(move)

  try {
    return updateBoard(oldBoard, fromTile, toTile)
  } catch (error) {
    console.error(error)
    console.error("move: ", move)
    console.error("board: ", oldBoard)
    console.log(boardToAscii(oldBoard))
    console.log(generateFen(oldBoard))
    return oldBoard
  }
}

const clonePiece = (oldPiece: Piece | Empty): Piece | Empty => {
  return oldPiece
}

export function updateBoard(
  oldBoard: Board,
  fromTile: Tile,
  toTile: Tile
): Board {
  const { rowIdx: fromRow, colIdx: fromCol } = fromTile
  const { rowIdx: toRow, colIdx: toCol } = toTile
  const oldPiece = oldBoard[fromRow][fromCol]
  const { side, kind } = oldPiece
  const newPiece = clonePiece(oldPiece)

  const isAPawnPromotion = (
    kind: string,
    toRow: number,
    side: Side
  ): boolean => {
    return (
      kind === "pawn" &&
      ((toRow === 0 && side === white) || (toRow === 7 && side === black))
    )
  }

  const isACastle = (
    kind: string,
    fromRow: number,
    fromCol: number,
    toCol: number,
    side: Side
  ): boolean => {
    if (
      kind === "king" &&
      fromCol === 4 &&
      (toCol === 2 || toCol === 6) &&
      ((side === black && fromRow === 0) || (side === white && fromRow === 7))
    ) {
      return true
    } else {
      return false
    }
  }

  const castleKing = (
    newBoard: Board,
    toCol: number,
    toRow: number,
    side: Side
  ): void => {
    newBoard[toRow][toCol] = oldPiece
    if (toCol === 2) {
      newBoard[toRow][3] = new rook(side)
      newBoard[toRow][0] = new empty()
    } else if (toCol === 6) {
      newBoard[toRow][5] = new rook(side)
      newBoard[toRow][7] = new empty()
    }
  }

  const newBoard = ArrayHelpers.deepDup(oldBoard)
  if (side != null) {
    newBoard[fromRow][fromCol] = new empty()
    if (isAPawnPromotion(kind, toRow, side)) {
      newBoard[toRow][toCol] = new queen(side)
    } else if (isACastle(kind, fromRow, fromCol, toCol, side)) {
      castleKing(newBoard, toCol, toRow, side)
    } else {
      newBoard[toRow][toCol] = newPiece
    }
  }
  return newBoard
}

export function removePiece(oldBoard: Board, tile: Tile): Board {
  const { colIdx, rowIdx } = tile
  const newBoard = ArrayHelpers.deepDup(oldBoard)
  newBoard[rowIdx][colIdx] = new empty()
  return newBoard
}

export function validMove(
  board: Board,
  fromTile: Tile,
  toTile: Tile,
  side: Side
): boolean {
  const fen = generateFen(board, side)
  const chessClient: ChessInstance = Chess(fen)
  const from: Square = tileRCtoAN(fromTile).square
  const to: Square = tileRCtoAN(toTile).square

  const shortMove: ShortMove = { from, to, promotion: "q" }
  const move: Move | null = chessClient.move(shortMove)

  return move == null ? false : true
}

export const generateFen = (board: Board, side: Side = white): string => {
  const fenChars: string[] = board.map(rank => {
    return rank
      .map(file => {
        return file.fenId || "0"
      })
      .join("")
  })

  const sideChar = side === white ? "w" : "b"

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
          return piece.fenId || "0"
        })
        .join(" ")
    })
    .join("\n")
}
