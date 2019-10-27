import Chess, { ChessInstance, Move, Side, black } from "../chess/chess"
import { FenId } from "../chess/types"
import { Board, generateFen, updateBoardWithMove } from "../game_helpers"
import * as ArrayHelpers from "../array_helpers"

interface MoveWithValue {
  move: Move
  value: number
}

export const selectMove = (board: Board, side: Side): Move | null => {
  const gameMoves: Move[] = validMoves(board, side)

  const compareByValue = (side: Side) => {
    const operator =
      side === black
        ? (a: number, b: number) => a < b
        : (a: number, b: number) => a > b

    return (moveA: MoveWithValue, moveB: MoveWithValue): number => {
      const { value: valueA } = moveA
      const { value: valueB } = moveB
      if (operator(valueA, valueB)) {
        return -1
      } else if (!operator(valueA, valueB)) {
        return 1
      } else {
        return 0
      }
    }
  }

  const move = ArrayHelpers.sample(
    gameMoves
      .map(move => {
        const updatedBoard = updateBoardWithMove(board, move)
        const value = boardValue(updatedBoard)
        return { move, value }
      })
      .sort(compareByValue(side))
      .slice(0, 3)
  )

  if (move) {
    return move.move
  } else {
    return null
  }
}

const pawnEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
]

const knightEval = [
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
]

const bishopEvalWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
]

const rookEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
]

const queenEval = [
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
]

const kingEvalWhite = [
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
]

const kingEvalBlack = ArrayHelpers.reverse<number[]>(kingEvalWhite)
const rookEvalBlack = ArrayHelpers.reverse<number[]>(rookEvalWhite)
const bishopEvalBlack = ArrayHelpers.reverse<number[]>(bishopEvalWhite)
const pawnEvalBlack = ArrayHelpers.reverse<number[]>(pawnEvalWhite)

const pieceValue = (fenId: FenId, rowIdx: number, colIdx: number): number => {
  const pieceValue = pieceValues[fenId]
  switch (fenId) {
    case "p": {
      return pieceValue - pawnEvalBlack[rowIdx][colIdx]
    }
    case "r": {
      return pieceValue - rookEvalBlack[rowIdx][colIdx]
    }
    case "n": {
      return pieceValue - knightEval[rowIdx][colIdx]
    }
    case "b": {
      return pieceValue - bishopEvalBlack[rowIdx][colIdx]
    }
    case "q": {
      return pieceValue - queenEval[rowIdx][colIdx]
    }
    case "k": {
      return pieceValue - kingEvalBlack[rowIdx][colIdx]
    }
    case "P": {
      return pieceValue + pawnEvalWhite[rowIdx][colIdx]
    }
    case "R": {
      return pieceValue + rookEvalWhite[rowIdx][colIdx]
    }
    case "N": {
      return pieceValue + knightEval[rowIdx][colIdx]
    }
    case "B": {
      return pieceValue + bishopEvalWhite[rowIdx][colIdx]
    }
    case "Q": {
      return pieceValue + queenEval[rowIdx][colIdx]
    }
    case "K": {
      return pieceValue + kingEvalWhite[rowIdx][colIdx]
    }
  }
}

export function boardValue(board: Board): number {
  const values = board.flatMap((rank, rowIdx) => {
    return rank.map((piece, colIdx) => {
      const { fenId } = piece
      return fenId != null ? pieceValue(fenId, rowIdx, colIdx) : 0
    })
  })

  return values.reduce((acc, pieceValue, _index) => {
    return pieceValue + acc
  })
}

function validMoves(board: Board, side: Side): Move[] {
  const fen = generateFen(board, side)
  const chessInstance: ChessInstance = Chess(fen)
  return chessInstance.moves()
}

const pieceValues: { [id in FenId]: number } = {
  p: -10,
  n: -30,
  b: -30,
  r: -50,
  q: -90,
  k: -900,
  P: 10,
  N: 30,
  B: 30,
  R: 50,
  Q: 90,
  K: 900,
}
