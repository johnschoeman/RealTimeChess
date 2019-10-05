import { Move, Square } from "chess.js"

import {
  Board,
  Tile,
  Side,
  ANTile,
  createBoard,
  validMoves,
  validMove,
  winner,
  tileRCtoAN,
  tileANtoRC,
  generateFen,
  boardToAscii,
} from "../../utils/game_helpers"
import { BoardFixtures } from "../__fixtures__"

type Color = "b" | "w"
type PieceKind = "p" | "n" | "b" | "r" | "q" | "k"

const move = (
  color: Color,
  from: Square,
  to: Square,
  flags: string,
  piece: PieceKind,
  san: string
): Move => {
  return {
    color,
    from,
    to,
    flags,
    piece,
    san,
  }
}

describe("createBoard", () => {
  describe("when not given a fen code", () => {
    test("it generates the inital board position", () => {
      const fenCode = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      const board: Board = createBoard(fenCode)

      const result = boardToAscii(board)
      const expected = boardToAscii(BoardFixtures.initialBoard)
      expect(result).toEqual(expected)
    })
  })

  describe("when given a fen code", () => {
    test("it creates a board based off the fen code", () => {
      const fenCode =
        "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPPP1PP/RNBQKB1R b KQkq - 1 2"
      const board: Board = createBoard(fenCode)

      const result = boardToAscii(board)
      const expected = boardToAscii(BoardFixtures.boardWithMoves)
      expect(result).toEqual(expected)
    })
  })
})

describe("tileRCtoAN", () => {
  test("it converts row col Tiles to algebraic notation tiles", () => {
    const tile1: Tile = { rowIdx: 0, colIdx: 0 }
    const tile2: Tile = { rowIdx: 0, colIdx: 7 }
    const tile3: Tile = { rowIdx: 7, colIdx: 7 }
    const tile4: Tile = { rowIdx: 7, colIdx: 0 }
    const tile5: Tile = { rowIdx: 3, colIdx: 5 }

    expect(tileRCtoAN(tile1)).toEqual({ rank: "8", file: "a", square: "a8" })
    expect(tileRCtoAN(tile2)).toEqual({ rank: "8", file: "h", square: "h8" })
    expect(tileRCtoAN(tile3)).toEqual({ rank: "1", file: "h", square: "h1" })
    expect(tileRCtoAN(tile4)).toEqual({ rank: "1", file: "a", square: "a1" })
    expect(tileRCtoAN(tile5)).toEqual({ rank: "5", file: "f", square: "f5" })
  })
})

describe("tileANtoRC", () => {
  test("it converts alegbraic notation tiles to row col tiles", () => {
    const tile1: ANTile = { rank: "8", file: "a", square: "a8" }
    const tile2: ANTile = { rank: "8", file: "h", square: "h8" }
    const tile3: ANTile = { rank: "1", file: "h", square: "h1" }
    const tile4: ANTile = { rank: "1", file: "a", square: "a1" }
    const tile5: ANTile = { rank: "5", file: "f", square: "f5" }

    expect(tileANtoRC(tile1)).toEqual({ rowIdx: 0, colIdx: 0 })
    expect(tileANtoRC(tile2)).toEqual({ rowIdx: 0, colIdx: 7 })
    expect(tileANtoRC(tile3)).toEqual({ rowIdx: 7, colIdx: 7 })
    expect(tileANtoRC(tile4)).toEqual({ rowIdx: 7, colIdx: 0 })
    expect(tileANtoRC(tile5)).toEqual({ rowIdx: 3, colIdx: 5 })
  })
})

describe("validMove", () => {
  describe("when given a valid move", () => {
    test("it returns true", () => {
      const board: Board = createBoard()

      const pa7a8 = validMove(
        board,
        { colIdx: 0, rowIdx: 1 },
        { colIdx: 0, rowIdx: 2 },
        "black"
      )
      const Ng1g3 = validMove(
        board,
        { colIdx: 6, rowIdx: 7 },
        { colIdx: 5, rowIdx: 5 },
        "white"
      )

      expect(pa7a8).toBeTruthy()
      expect(Ng1g3).toBeTruthy()
    })
  })

  describe("when given an invalid move", () => {
    test("it returns false", () => {
      const board: Board = createBoard()

      const Bc1e3 = validMove(
        board,
        { colIdx: 2, rowIdx: 7 },
        { colIdx: 4, rowIdx: 5 },
        "white"
      )
      const Bc1c3 = validMove(
        board,
        { colIdx: 2, rowIdx: 7 },
        { colIdx: 2, rowIdx: 5 },
        "white"
      )

      expect(Bc1e3).toBeFalsy()
      expect(Bc1c3).toBeFalsy()
    })
  })
})

describe("generateFen", () => {
  describe("when the board is in the initial state", () => {
    test("it generates the corresponding fen code", () => {
      const fen: string = generateFen(BoardFixtures.initialBoard)

      expect(fen).toBe(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      )
    })
  })

  describe("when the board is not in an initial state", () => {
    test("it generates the corresponding fen code", () => {
      const fen: string = generateFen(BoardFixtures.boardWithMoves)

      expect(fen).toBe(
        "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPPP1PP/RNBQKB1R w KQkq - 0 1"
      )
    })
  })

  describe("when the moving piece is white", () => {
    test("it includes 'w' as the player token", () => {
      const board: Board = createBoard()

      const fen: string = generateFen(board, "white")

      expect(fen).toBe(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      )
    })
  })

  describe("whent the moving piece is black", () => {
    test("it includes 'b' as the player token", () => {
      const board: Board = createBoard()

      const fen: string = generateFen(board, "black")

      expect(fen).toBe(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1"
      )
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

describe("winner", () => {
  describe("when niether players king has been taken", () => {
    test("it returns null", () => {
      const board: Board = createBoard()

      const result: Side | null = winner(board)

      expect(result).toBe(null)
    })
  })

  describe("when the white players king has been taken", () => {
    test("it returns 'black'", () => {
      const result: Side | null = winner(BoardFixtures.blackWonGame)

      expect(result).toBe("black")
    })
  })
  describe("when the black players king has been taken", () => {
    test("it returns 'white'", () => {
      const result: Side | null = winner(BoardFixtures.whiteWonGame)

      expect(result).toBe("white")
    })
  })
})
