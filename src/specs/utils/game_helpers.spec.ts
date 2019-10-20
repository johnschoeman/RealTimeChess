import {
  Board,
  Tile,
  Side,
  ANTile,
  createBoard,
  validMove,
  winner,
  tileRCtoAN,
  tileANtoRC,
  generateFen,
  boardToAscii,
  updateBoard,
  updateBoardWithMove,
} from "../../utils/game_helpers"
import { BoardFixtures } from "../__fixtures__"

import { Move } from "../../utils/chess/types"

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

  describe("when given an invalid fenCode", () => {
    test("it raises an error", () => {})
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

  describe("when the move is a pawn promotion", () => {
    test("it returns true", () => {
      const startBoard: Board = createBoard(
        "rnbqkbnr/pPpppppp/8/8/8/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1"
      )

      const result: boolean = validMove(
        startBoard,
        { rowIdx: 1, colIdx: 1 },
        { rowIdx: 0, colIdx: 0 },
        "white"
      )

      expect(result).toBeTruthy()
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

  describe("when the king is moving into check", () => {
    test("it returns true", () => {
      const board: Board = createBoard("RK6/8/8/8/8/8/8/1krr4 b KQkq - 0 1")

      const ka2a1 = validMove(
        board,
        { colIdx: 1, rowIdx: 7 },
        { colIdx: 0, rowIdx: 7 },
        "black"
      )

      const ka2b1 = validMove(
        board,
        { colIdx: 1, rowIdx: 7 },
        { colIdx: 0, rowIdx: 6 },
        "black"
      )

      expect(ka2a1).toBe(true)
      expect(ka2b1).toBe(true)
    })
  })

  describe("when the king is in check and the move is not moving the king out of check", () => {
    test("it returns true", () => {
      const board: Board = createBoard("rk6/8/8/8/8/8/8/K1RR4 b KQkq - 0 1")

      const Ka1b1 = validMove(
        board,
        { colIdx: 0, rowIdx: 7 },
        { colIdx: 0, rowIdx: 6 },
        "white"
      )

      expect(Ka1b1).toBe(true)
    })
  })

  describe("when the player is castling", () => {
    describe("and castling is allowed", () => {
      test("it returns true", () => {
        const board: Board = createBoard(
          "r3k2r/p6p/8/8/8/8/P6P/R3K2R w KQkq - 0 1"
        )

        const kOOO = validMove(
          board,
          { colIdx: 4, rowIdx: 0 },
          { colIdx: 2, rowIdx: 0 },
          "black"
        )
        const kOO = validMove(
          board,
          { colIdx: 4, rowIdx: 0 },
          { colIdx: 6, rowIdx: 0 },
          "black"
        )
        const KOOO = validMove(
          board,
          { colIdx: 4, rowIdx: 7 },
          { colIdx: 2, rowIdx: 7 },
          "white"
        )
        const KOO = validMove(
          board,
          { colIdx: 4, rowIdx: 7 },
          { colIdx: 6, rowIdx: 7 },
          "white"
        )

        expect(kOOO).toBe(true)
        expect(kOO).toBe(true)
        expect(KOOO).toBe(true)
        expect(KOO).toBe(true)
      })
    })

    describe("and the player is trying to castle through an attacked or occupied square", () => {
      test("it returns false", () => {
        const board: Board = createBoard("4k3/p6p/8/8/8/8/P6P/3RKR2 w - - 0 1")

        const kOOO = validMove(
          board,
          { colIdx: 4, rowIdx: 0 },
          { colIdx: 2, rowIdx: 0 },
          "black"
        )
        const kOO = validMove(
          board,
          { colIdx: 4, rowIdx: 0 },
          { colIdx: 6, rowIdx: 0 },
          "black"
        )
        const KOOO = validMove(
          board,
          { colIdx: 4, rowIdx: 7 },
          { colIdx: 2, rowIdx: 7 },
          "white"
        )
        const KOO = validMove(
          board,
          { colIdx: 4, rowIdx: 7 },
          { colIdx: 6, rowIdx: 7 },
          "white"
        )

        expect(kOOO).toBe(false)
        expect(kOO).toBe(false)
        expect(KOOO).toBe(false)
        expect(KOO).toBe(false)
      })
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

describe("updateBoardWithMove", () => {
  test("it converts the given move to tiles and calls updateBoard", () => {
    const board = createBoard()
    const move: Move = {
      from: "a2",
      to: "a3",
      piece: "p",
      color: "b",
      flags: "",
      san: "foo",
    }

    const result = updateBoardWithMove(board, move)

    const expectedFen =
      "rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR b KQkq - 0 1"
    const expected: Board = createBoard(expectedFen)

    expectBoardsToMatch(result, expected)
  })
})

describe("updateBoard", () => {
  describe("When provided an intial board and a move", () => {
    test("it creates an a new board with the move applied", () => {
      const initialBoard: Board = createBoard()

      const result: Board = updateBoard(
        initialBoard,
        { rowIdx: 6, colIdx: 0 },
        { rowIdx: 5, colIdx: 0 }
      )

      const expectedFen =
        "rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR b KQkq - 0 1"
      const expected: Board = createBoard(expectedFen)

      expectBoardsToMatch(result, expected)
    })
  })

  describe("when a pawn moves to the back row", () => {
    test("the pawn is promoted to a queen", () => {
      const startBoard: Board = createBoard(
        "rnbqkbnr/pPpppppp/8/8/8/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1"
      )

      const result: Board = updateBoard(
        startBoard,
        { rowIdx: 1, colIdx: 1 },
        { rowIdx: 0, colIdx: 0 }
      )

      const expectedFen =
        "Qnbqkbnr/p1pppppp/8/8/8/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1"
      const expected: Board = createBoard(expectedFen)
      expectBoardsToMatch(result, expected)
    })
  })

  describe("when the king is castling", () => {
    describe("queenside castle", () => {
      test("the king moves two squares towards the intended rook and the rook moves to the other side", () => {
        const startBoard: Board = createBoard(
          "r3kbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1"
        )

        const result: Board = updateBoard(
          startBoard,
          { rowIdx: 0, colIdx: 4 },
          { rowIdx: 0, colIdx: 2 }
        )

        const expectedFen =
          "2kr1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1"
        const expected: Board = createBoard(expectedFen)
        expectBoardsToMatch(result, expected)
      })
    })

    describe("kingside castle", () => {
      test("the king moves two squares towards the intended rook and the rook moves to the other side", () => {
        const startBoard: Board = createBoard(
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK2R b KQkq - 0 1"
        )

        const result: Board = updateBoard(
          startBoard,
          { rowIdx: 7, colIdx: 4 },
          { rowIdx: 7, colIdx: 6 }
        )

        const expectedFen =
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQ1RK1 KQkq - 0 1"
        const expected: Board = createBoard(expectedFen)
        expectBoardsToMatch(result, expected)
      })
    })
  })
})

const expectBoardsToMatch = (testResult: Board, expected: Board) => {
  const expectedAscii = boardToAscii(expected)
  const resultAscii = boardToAscii(testResult)
  expect(resultAscii).toStrictEqual(expectedAscii)
}
