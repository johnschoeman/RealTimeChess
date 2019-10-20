import { selectMove, boardValue } from "../../../utils/ai/maximizing_ai"

import { createBoard } from "../../../utils/game_helpers"

describe("selectMove", () => {
  describe("when there are available moves", () => {
    test("it selects a move", () => {
      const board = createBoard()

      const result = selectMove(board, "black")

      expect(result).not.toBe(null)
    })
  })
})

describe("boardValue", () => {
  describe("when applied to the initialBoard", () => {
    test("it returns 0", () => {
      const board = createBoard()
      const result = boardValue(board)

      expect(result).toBe(0)
    })
  })

  describe("when applied to an non initialBoard", () => {
    describe("when white has more pieces", () => {
      test("it returns a greater number", () => {
        const initialBoard = createBoard()
        const betterBlackBoard = createBoard(
          "rnbqkbnr/pppppppp/8/8/8/8/1PPPPPPP/RNBQKBNR w KQkq - 0 1"
        )
        const bestBlackBoard = createBoard(
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQ1BNR w KQkq - 0 1"
        )
        const betterWhiteBoard = createBoard(
          "rnbqkbnr/1ppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        )
        const bestWhiteBoard = createBoard(
          "rnb1qbnr/1ppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        )

        const initialValue = boardValue(initialBoard)
        const betterBlackValue = boardValue(betterBlackBoard)
        const bestBlackValue = boardValue(bestBlackBoard)
        const betterWhiteValue = boardValue(betterWhiteBoard)
        const bestWhiteValue = boardValue(bestWhiteBoard)

        expect(betterBlackValue).toBeGreaterThan(bestBlackValue)
        expect(initialValue).toBeGreaterThan(betterBlackValue)
        expect(betterWhiteValue).toBeGreaterThan(initialValue)
        expect(bestWhiteValue).toBeGreaterThan(betterWhiteValue)
      })
    })
  })
})
