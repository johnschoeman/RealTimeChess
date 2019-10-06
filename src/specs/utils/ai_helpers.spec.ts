import { Square } from "chess.js"

import { Board, createBoard } from "../../utils/game_helpers"
import {
  Move,
  Color,
  Piece,
  validMoves,
  selectMove,
} from "../../utils/ai_helpers"

describe("selectMove", () => {
  describe("when there is are valid attacking moves", () => {
    test("it returns one of the attacking moves", () => {
      const fenWithOneAttackingMove = "8/8/8/8/8/8/k7/K7 b - - 0 1"
      const board: Board = createBoard(fenWithOneAttackingMove)

      const result = selectMove(board, "white")

      expect(result).toStrictEqual(move("w", "a1", "a2", "c", "k", "Kxa2", "k"))
    })
  })

  describe("when there are valid moves, but no valid attakcing moves", () => {
    test("it returns on of the valid moves", () => {
      const fenWithValidMoves = "k7/8/8/8/8/8/8/KN6 b kq - 0 1"
      const board: Board = createBoard(fenWithValidMoves)

      const result = selectMove(board, "white")

      const possibleMoves: Move[] = [
        move("w", "a1", "a2", "n", "k", "Ka2"),
        move("w", "a1", "b2", "n", "k", "Kb2"),
        move("w", "b1", "a3", "n", "n", "Na3"),
        move("w", "b1", "c3", "n", "n", "Nc3"),
        move("w", "b1", "d2", "n", "n", "Nd2"),
      ]
      expect(possibleMoves).toContainEqual(result)
    })
  })

  describe("when there are no valid moves", () => {
    test("it returns null", () => {
      const fenWithNoValidMoves = "8/8/8/8/8/8/8/k7 b - - 0 1"
      const board: Board = createBoard(fenWithNoValidMoves)

      const result = selectMove(board, "white")

      expect(result).toBe(null)
    })
  })
})

describe("validMoves", () => {
  describe("when the current player is white", () => {
    test("it returns all valid moves for the white player", () => {
      const fenCodeWithOnePiece = "4q3/8/8/8/8/8/P7/RK6 b KQkq - 0 1"
      const board: Board = createBoard(fenCodeWithOnePiece)

      const moves: Move[] = validMoves(board, "white")

      expect(moves).toEqual([
        move("w", "a2", "a3", "n", "p", "a3"),
        move("w", "a2", "a4", "b", "p", "a4"),
        move("w", "b1", "b2", "n", "k", "Kb2"),
        move("w", "b1", "c2", "n", "k", "Kc2"),
        move("w", "b1", "c1", "n", "k", "Kc1"),
        move("w", "b1", "d1", "k", "k", "O-O"),
      ])
    })
  })

  describe("when either player has lost their king", () => {
    test("it returns []", () => {
      const fenCodeWithNoKings =
        "rbnq1nbr/pppppppp/8/8/8/8/PPPPPPPP/RBNQ1NBR b - - 0 1"
      const board: Board = createBoard(fenCodeWithNoKings)

      const moves: Move[] = validMoves(board, "black")

      expect(moves).toEqual([])
    })
  })
})

const move = (
  color: Color,
  from: Square,
  to: Square,
  flags: string,
  piece: Piece,
  san: string,
  captured?: Piece
): Move => {
  return {
    color,
    from,
    to,
    flags,
    piece,
    san,
    captured,
  }
}
