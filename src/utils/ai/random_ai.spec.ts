import { Square, Move, PieceType, Side, white, Promotion } from "../chess/chess"
import { Board, createBoard } from "../game_helpers"

import { selectMove } from "./random_ai"

describe("selectMove", () => {
  describe("when there is are valid attacking moves", () => {
    test("it returns one of the attacking moves", () => {
      const fenWithOneAttackingMove = "8/8/8/8/8/8/k7/K7 b - - 0 1"
      const board: Board = createBoard(fenWithOneAttackingMove)

      const result = selectMove(board, white)

      expect(result).toStrictEqual(move("w", "a1", "a2", "c", "k", "Kxa2", "k"))
    })
  })

  describe("when there are valid moves, but no valid attakcing moves", () => {
    test("it returns on of the valid moves", () => {
      const fenWithValidMoves = "k7/8/8/8/8/8/8/KN6 b kq - 0 1"
      const board: Board = createBoard(fenWithValidMoves)

      const result = selectMove(board, white)

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

      const result = selectMove(board, white)

      expect(result).toBe(null)
    })
  })
})

const move = (
  side: Side,
  from: Square,
  to: Square,
  flags: string,
  piece: PieceType,
  san: string,
  captured?: PieceType,
  promotion?: Promotion
): Move => {
  return {
    color: side,
    from,
    to,
    flags,
    piece,
    san,
    captured,
    promotion,
  }
}
