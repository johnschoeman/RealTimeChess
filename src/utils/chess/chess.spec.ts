import { chessMoves } from "./chess"

describe("chessMoves", () => {
  test("it returns all the valid moves for given side", () => {})

  test("it only returns moves with valid to squares", () => {
    const board = "r4rk1/ppp2ppp/3qbn2/3pp3/8/8/PPnbPPPP/RNBQKBNR"

    const moves = chessMoves(board, "b")

    const toValues = moves.map(move => move.to)
    expect(toValues).not.toContain("8")
  })
})
