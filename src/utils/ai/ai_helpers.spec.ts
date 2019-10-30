import {
  Square,
  Move,
  PieceType,
  Side,
  black,
  white,
  Promotion,
} from "../chess/chess"
import { Board, createBoard } from "../game_helpers"

import { validMoves } from "./ai_helpers"

describe("validMoves", () => {
  describe("when the current player is white", () => {
    test("it returns all valid moves for the white player", () => {
      const fenCodeWithOnePiece = "4q3/8/8/8/8/8/P7/RK6 b KQkq - 0 1"
      const board: Board = createBoard(fenCodeWithOnePiece)

      const moves: Move[] = validMoves(board, white)

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

      const moves: Move[] = validMoves(board, black)

      expect(moves).toEqual([])
    })
  })

  describe("when there are pieces with active cooldowns", () => {
    test("it doens't include any piece with an acitve cooldown", () => {
      const fenCodeWithOnePiece = "4q3/8/8/8/8/8/P7/RK6 b KQkq - 0 1"
      const board: Board = createBoard(fenCodeWithOnePiece)
      const king = board[7][1]
      king.cooldown = 3

      const moves: Move[] = validMoves(board, white)

      expect(moves).toEqual([
        move("w", "a2", "a3", "n", "p", "a3"),
        move("w", "a2", "a4", "b", "p", "a4"),
      ])
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
