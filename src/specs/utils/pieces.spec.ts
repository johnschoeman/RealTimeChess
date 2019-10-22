import { pawn } from "../../utils/pieces"

describe("pawn", () => {
  describe("when given a side of white", () => {
    test("it returns a piece with fenId of P", () => {
      const piece = new pawn("w")

      expect(piece.fenId).toEqual("P")
    })
  })

  describe("when given a side of black", () => {
    test("it returns a piece with fenId of p", () => {
      const piece = new pawn("b")

      expect(piece.fenId).toEqual("p")
    })
  })
})
