/*
 * Copyright (c) 2018, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *----------------------------------------------------------------------------*/

/* minified license below  */

/* @license
 * Copyright (c) 2018, Jeff Hlywa (jhlywa@gmail.com)
 * Released under the BSD license
 * https://github.com/jhlywa/chess.js/blob/master/LICENSE
 */

import {
  ChessInstance,
  Move,
  Square,
  ShortMove,
  Piece,
  FenCode,
  Side,
  PieceType,
  Promotion,
} from "./types"

/**
 * Move format used inside engine
 * color: "b" | "w"
 * from: number
 * to: number
 * flags: number
 * piece: "p" | "n" | "b" | "r" | "q" | "k"
 * captured?: "p" | "n" | "b" | "r" | "q" | "k"
 * promotion?: "n" | "b" | "r" | "q"
 */
interface InternalMove {
  color: Side
  from: number
  to: number
  flags: number
  piece: PieceType
  captured?: PieceType
  promotion?: Promotion
}

type InternalPiece = {
  type: PieceType
  color: Side
}

interface HistoryItem {
  move: InternalMove
  kings: Kings
  turn: Side
  castling: Castling
  ep_square: number
  half_moves: number
  move_number: number
}

interface Kings {
  w: number
  b: number
}

interface Castling {
  w: number | null
  b: number | null
}

type InternalBoard = (InternalPiece | null)[]

var Chess = (fen: string): ChessInstance => {
  const BLACK: Side = "b"
  const WHITE: Side = "w"

  const EMPTY: number = -1

  const PAWN: PieceType = "p"
  const KING: PieceType = "k"

  const SYMBOLS = "pnbrqkPNBRQK"

  const DEFAULT_POSITION =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

  const PAWN_OFFSETS: { [K in Side]: number[] } = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15],
  }

  const PIECE_OFFSETS: { [K in PieceType]: number[] } = {
    n: [-18, -33, -31, -14, 18, 33, 31, 14],
    b: [-17, -15, 17, 15],
    r: [-16, 1, 16, -1],
    q: [-17, -16, -15, 1, 17, 16, 15, -1],
    k: [-17, -16, -15, 1, 17, 16, 15, -1],
    p: [],
  }

  // prettier-ignore
  var ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
  ];

  // prettier-ignore
  var RAYS = [
     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
  ];

  const SHIFTS: { [K in PieceType]: number } = {
    p: 0,
    n: 1,
    b: 2,
    r: 3,
    q: 4,
    k: 5,
  }

  type Flag =
    | "NORMAL"
    | "CAPTURE"
    | "BIG_PAWN"
    | "EP_CAPTURE"
    | "PROMOTION"
    | "KSIDE_CASTLE"
    | "QSIDE_CASTLE"

  const FLAGS: { [K in Flag]: string } = {
    NORMAL: "n",
    CAPTURE: "c",
    BIG_PAWN: "b",
    EP_CAPTURE: "e",
    PROMOTION: "p",
    KSIDE_CASTLE: "k",
    QSIDE_CASTLE: "q",
  }

  const BITS: { [K in Flag]: number } = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64,
  }

  const RANK_1 = 7
  const RANK_2 = 6
  const RANK_7 = 1
  const RANK_8 = 0

  // prettier-ignore
  const SQUARES: { [K in Square]: number } = {
    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
  };

  var board: (InternalPiece | null)[] = new Array(128)
  var kings: Kings = { w: EMPTY, b: EMPTY }
  var turn: Side = WHITE
  var castling: Castling = { w: 0, b: 0 }
  var ep_square = EMPTY
  var half_moves = 0
  var move_number = 1
  var history: HistoryItem[] = []

  /* if the user passes in a fen string, load it, else default to
   * starting position
   */
  if (typeof fen === "undefined") {
    load(DEFAULT_POSITION)
  } else {
    load(fen)
  }

  function clear() {
    board = new Array(128)
    kings = { w: EMPTY, b: EMPTY }
    turn = WHITE
    castling = { w: 0, b: 0 }
    ep_square = EMPTY
    half_moves = 0
    move_number = 1
    history = []
  }

  function parseFen(fen: string): FenCode {
    const parts: string[] = fen.split(/\s+/)
    const board: string = parts[0]
    const currentPlayer: Side = parts[1] as Side
    const castleAvailablity: string = parts[2]
    const EnPassanteAvailability: Square | "-" = parts[3] as Square | "-"
    const halfMoveClock: number = Number(parts[4])
    const moveCount: number = Number(parts[5])

    return [
      board,
      currentPlayer,
      castleAvailablity,
      EnPassanteAvailability,
      halfMoveClock,
      moveCount,
    ]
  }

  function load(fen: string) {
    const [
      board,
      currentPlayer,
      castleAvailablity,
      EnPassanteAvailability,
      halfMoveClock,
      moveCount,
    ] = parseFen(fen)
    let square: number = 0

    if (!validate_fen(fen).valid) {
      return false
    }

    clear()

    for (var i = 0; i < board.length; i++) {
      var piece = board.charAt(i)

      if (piece === "/") {
        square += 8
      } else if (is_digit(piece)) {
        square += Number(piece)
      } else {
        var color: Side = piece < "a" ? WHITE : BLACK
        const type: PieceType = piece.toLowerCase() as PieceType
        put({ type, color: color }, algebraic(square))
        square++
      }
    }

    turn = currentPlayer

    if (castling.w != null && castling.b != null) {
      if (castleAvailablity.indexOf("K") > -1) {
        castling.w |= BITS.KSIDE_CASTLE
      }
      if (castleAvailablity.indexOf("Q") > -1) {
        castling.w |= BITS.QSIDE_CASTLE
      }
      if (castleAvailablity.indexOf("k") > -1) {
        castling.b |= BITS.KSIDE_CASTLE
      }
      if (castleAvailablity.indexOf("q") > -1) {
        castling.b |= BITS.QSIDE_CASTLE
      }
    }

    const ep_token: Square | "-" = EnPassanteAvailability
    if (ep_token === "-") {
      ep_square = EMPTY
    } else {
      ep_square = SQUARES[ep_token]
    }
    half_moves = halfMoveClock
    move_number = moveCount

    return true
  }

  /* TODO: this function is pretty much crap - it validates structure but
   * completely ignores content (e.g. doesn't verify that each side has a king)
   * ... we should rewrite this, and ditch the silly error_number field while
   * we're at it
   */
  function validate_fen(fen: string) {
    var errors = {
      0: "No errors.",
      1: "FEN string must contain six space-delimited fields.",
      2: "6th field (move number) must be a positive integer.",
      3: "5th field (half move counter) must be a non-negative integer.",
      4: "4th field (en-passant square) is invalid.",
      5: "3rd field (castling availability) is invalid.",
      6: "2nd field (side to move) is invalid.",
      7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
      8: "1st field (piece positions) is invalid [consecutive numbers].",
      9: "1st field (piece positions) is invalid [invalid piece].",
      10: "1st field (piece positions) is invalid [row too large].",
      11: "Illegal en-passant square",
    }

    /* 1st criterion: 6 space-seperated fields? */
    const tokens = parseFen(fen)

    const [
      board,
      currentPlayer,
      castleAvailablity,
      EnPassanteAvailability,
      halfMoveClock,
      moveCount,
    ] = tokens

    if (tokens.length !== 6) {
      return { valid: false, error_number: 1, error: errors[1] }
    }

    /* 2nd criterion: move number field is a integer value > 0? */
    if (isNaN(moveCount) || moveCount <= 0) {
      return { valid: false, error_number: 2, error: errors[2] }
    }

    /* 3rd criterion: half move counter is an integer >= 0? */
    if (isNaN(halfMoveClock) || halfMoveClock < 0) {
      return { valid: false, error_number: 3, error: errors[3] }
    }

    /* 4th criterion: 4th field is a valid e.p.-string? */
    if (!/^(-|[abcdefgh][36])$/.test(EnPassanteAvailability)) {
      return { valid: false, error_number: 4, error: errors[4] }
    }

    /* 5th criterion: 3th field is a valid castle-string? */
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(castleAvailablity)) {
      return { valid: false, error_number: 5, error: errors[5] }
    }

    /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
    if (!/^(w|b)$/.test(currentPlayer)) {
      return { valid: false, error_number: 6, error: errors[6] }
    }

    /* 7th criterion: 1st field contains 8 rows? */
    var rows = board.split("/")
    if (rows.length !== 8) {
      return { valid: false, error_number: 7, error: errors[7] }
    }

    /* 8th criterion: every row is valid? */
    for (var i = 0; i < rows.length; i++) {
      /* check for right sum of fields AND not two numbers in succession */
      var sum_fields = 0
      var previous_was_number = false

      for (var k = 0; k < rows[i].length; k++) {
        if (!isNaN(Number(rows[i][k]))) {
          if (previous_was_number) {
            return { valid: false, error_number: 8, error: errors[8] }
          }
          sum_fields += parseInt(rows[i][k], 10)
          previous_was_number = true
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return { valid: false, error_number: 9, error: errors[9] }
          }
          sum_fields += 1
          previous_was_number = false
        }
      }
      if (sum_fields !== 8) {
        return { valid: false, error_number: 10, error: errors[10] }
      }
    }

    if (
      (tokens[3][1] == "3" && tokens[1] == "w") ||
      (tokens[3][1] == "6" && tokens[1] == "b")
    ) {
      return { valid: false, error_number: 11, error: errors[11] }
    }

    /* everything's okay! */
    return { valid: true, error_number: 0, error: errors[0] }
  }

  function generate_fen() {
    var empty = 0
    var fen = ""

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      const boardItem = board[i]
      if (boardItem == null) {
        empty++
      } else if (board[i] != null) {
        if (empty > 0) {
          fen += empty
          empty = 0
        }
        var color = boardItem.color
        var piece = boardItem.type

        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase()
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty
        }

        if (i !== SQUARES.h1) {
          fen += "/"
        }

        empty = 0
        i += 8
      }
    }

    var cflags = ""
    const castlingWhite = castling.w
    const castlingBlack = castling.b
    if (castlingWhite != null) {
      if (castlingWhite & BITS.KSIDE_CASTLE) {
        cflags += "K"
      }
      if (castlingWhite & BITS.QSIDE_CASTLE) {
        cflags += "Q"
      }
    }
    if (castlingBlack != null) {
      if (castlingBlack & BITS.KSIDE_CASTLE) {
        cflags += "k"
      }
      if (castlingBlack & BITS.QSIDE_CASTLE) {
        cflags += "q"
      }
    }

    /* do we have an empty castling flag? */
    cflags = cflags || "-"
    var epflags = ep_square === EMPTY ? "-" : algebraic(ep_square)

    return [fen, turn, cflags, epflags, half_moves, move_number].join(" ")
  }

  function put(piece: Piece, square: Square) {
    /* check for valid piece object */
    if (!("type" in piece && "color" in piece)) {
      return false
    }

    /* check for piece */
    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false
    }

    /* check for valid square */
    if (!(square in SQUARES)) {
      return false
    }

    var sq = SQUARES[square]

    /* don't let the user place more than one king */
    if (
      piece.type == KING &&
      !(kings[piece.color] == EMPTY || kings[piece.color] == sq)
    ) {
      return false
    }

    board[sq] = { type: piece.type, color: piece.color }
    if (piece.type === KING) {
      kings[piece.color] = sq
    }

    return true
  }

  function build_move(
    board: InternalBoard,
    from: number,
    to: number,
    flags: number,
    promotion?: Promotion
  ) {
    const boardFrom = board[from]
    const boardTo = board[to]

    if (boardFrom != null) {
      const move: InternalMove = {
        color: turn,
        from: from,
        to: to,
        flags: flags,
        piece: boardFrom.type,
      }

      if (promotion) {
        move.flags = move.flags | BITS.PROMOTION
        move.promotion = promotion
      }

      if (boardTo != null) {
        move.captured = boardTo.type
      } else if (flags & BITS.EP_CAPTURE) {
        move.captured = PAWN
      }
      return move
    } else {
      throw new Error("Trying to move null")
    }
  }

  function generate_moves() {
    function add_move(
      board: InternalBoard,
      moves: InternalMove[],
      from: number,
      to: number,
      flags: number
    ) {
      const boardFrom = board[from]
      if (boardFrom != null) {
        /* if pawn promotion */
        if (
          boardFrom.type === PAWN &&
          (rank(to) === RANK_8 || rank(to) === RANK_1)
        ) {
          moves.push(build_move(board, from, to, flags, "n"))
          moves.push(build_move(board, from, to, flags, "b"))
          moves.push(build_move(board, from, to, flags, "r"))
          moves.push(build_move(board, from, to, flags, "q"))
        } else {
          moves.push(build_move(board, from, to, flags))
        }
      } else {
        throw new Error("trying to move null")
      }
    }

    const moves: InternalMove[] = []
    var us = turn
    var them: Side = swap_color(us)
    var second_rank = { b: RANK_7, w: RANK_2 }

    var first_sq = SQUARES.a8
    var last_sq = SQUARES.h1

    for (var i = first_sq; i <= last_sq; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7
        continue
      }

      const piece = board[i]
      if (piece == null || piece.color !== us) {
        continue
      }

      if (piece.type === PAWN) {
        /* single square, non-capturing */
        var square = i + PAWN_OFFSETS[us][0]
        if (board[square] == null) {
          add_move(board, moves, i, square, BITS.NORMAL)

          /* double square */
          var square = i + PAWN_OFFSETS[us][1]
          if (second_rank[us] === rank(i) && board[square] == null) {
            add_move(board, moves, i, square, BITS.BIG_PAWN)
          }
        }

        /* pawn captures */
        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j]
          if (square & 0x88) {
            continue
          }
          const boardSquare = board[square]
          if (boardSquare != null && boardSquare.color === them) {
            add_move(board, moves, i, square, BITS.CAPTURE)
          } else if (square === ep_square) {
            add_move(board, moves, i, ep_square, BITS.EP_CAPTURE)
          }
        }
      } else {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j]
          var square = i

          while (true) {
            square += offset
            if (square & 0x88) {
              break
            }
            const boardSquare = board[square]
            if (boardSquare == null) {
              add_move(board, moves, i, square, BITS.NORMAL)
            } else {
              if (boardSquare.color === us) break
              add_move(board, moves, i, square, BITS.CAPTURE)
              break
            }

            /* break, if knight or king */
            if (piece.type === "n" || piece.type === "k") break
          }
        }
      }
    }

    /* check for castling if: a) we're generating all moves, or b) we're doing
     * single square move generation on the king's square
     */
    /* king-side castling */
    const castlingUs = castling[us]
    if (castlingUs != null) {
      if (castlingUs & BITS.KSIDE_CASTLE) {
        var castling_from = kings[us]
        var castling_to = castling_from + 2

        if (
          board[castling_from + 1] == null &&
          board[castling_to] == null &&
          !attacked(them, kings[us]) &&
          !attacked(them, castling_from + 1) &&
          !attacked(them, castling_to)
        ) {
          add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE)
        }
        // }

        /* queen-side castling */
        if (castlingUs & BITS.QSIDE_CASTLE) {
          var castling_from = kings[us]
          var castling_to = castling_from - 2

          if (
            board[castling_from - 1] == null &&
            board[castling_from - 2] == null &&
            board[castling_from - 3] == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from - 1) &&
            !attacked(them, castling_to)
          ) {
            add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE)
          }
        }
      }
    }

    /* return all pseudo-legal moves (this includes moves that allow the king
     * to be captured)
     */
    return moves
  }

  /* convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   *
   * @param {boolean} sloppy Use the sloppy SAN generator to work around over
   * disambiguation bugs in Fritz and Chessbase.  See below:
   *
   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
   * 4. ... Ne7 is technically the valid SAN
   */
  function move_to_san(move: InternalMove) {
    var output = ""

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = "O-O"
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = "O-O-O"
    } else {
      var disambiguator = get_disambiguator(move)

      if (move.piece !== PAWN) {
        output += move.piece.toUpperCase() + disambiguator
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0]
        }
        output += "x"
      }

      output += algebraic(move.to)

      if (move.flags & BITS.PROMOTION) {
        if (move.promotion) {
          output += "=" + move.promotion.toUpperCase()
        }
      }
    }

    make_move(move)
    if (in_check()) {
      if (in_checkmate()) {
        output += "#"
      } else {
        output += "+"
      }
    }
    undo_move()

    return output
  }

  function attacked(color: Side, square: number) {
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* did we run off the end of the board */
      if (i & 0x88) {
        i += 7
        continue
      }

      /* if empty square or wrong color */
      const boardItem = board[i]
      if (boardItem == null || boardItem.color !== color) continue

      var piece: InternalPiece = boardItem
      var difference = i - square
      var index = difference + 119

      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE) return true
          } else {
            if (piece.color === BLACK) return true
          }
          continue
        }

        /* if the piece is a knight or a king */
        if (piece.type === "n" || piece.type === "k") return true

        var offset = RAYS[index]
        var j = i + offset

        var blocked = false
        while (j !== square) {
          if (board[j] != null) {
            blocked = true
            break
          }
          j += offset
        }

        if (!blocked) return true
      }
    }

    return false
  }

  function king_attacked(color: Side) {
    return attacked(swap_color(color), kings[color])
  }

  function in_check() {
    return king_attacked(turn)
  }

  function in_checkmate() {
    return in_check() && generate_moves().length === 0
  }

  function push(move: InternalMove) {
    history.push({
      move: move,
      kings: { b: kings.b, w: kings.w },
      turn: turn,
      castling: { b: castling.b, w: castling.w },
      ep_square: ep_square,
      half_moves: half_moves,
      move_number: move_number,
    })
  }

  function make_move(move: InternalMove) {
    var us: Side = turn
    push(move)

    board[move.to] = board[move.from]
    board[move.from] = null

    /* if ep capture, remove the captured pawn */
    if (move.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move.to - 16] = null
      } else {
        board[move.to + 16] = null
      }
    }

    /* if pawn promotion, replace with new piece */
    if (move.flags & BITS.PROMOTION) {
      const piece: InternalPiece = {
        type: move.promotion as PieceType,
        color: us,
      }
      board[move.to] = piece
    }

    const boardTo = board[move.to]
    if (boardTo != null) {
      /* if we moved the king */
      if (boardTo.type === KING) {
        kings[boardTo.color] = move.to

        /* if we castled, move the rook next to the king */
        if (move.flags & BITS.KSIDE_CASTLE) {
          var castling_to = move.to - 1
          var castling_from = move.to + 1
          board[castling_to] = board[castling_from]
          board[castling_from] = null
        } else if (move.flags & BITS.QSIDE_CASTLE) {
          var castling_to = move.to + 1
          var castling_from = move.to - 2
          board[castling_to] = board[castling_from]
          board[castling_from] = null
        }

        /* turn off castling */
        castling[us] = null
      }
    }

    /* if big pawn move, update the en passant square */
    if (move.flags & BITS.BIG_PAWN) {
      if (turn === "b") {
        ep_square = move.to - 16
      } else {
        ep_square = move.to + 16
      }
    } else {
      ep_square = EMPTY
    }

    /* reset the 50 move counter if a pawn is moved or a piece is captured */
    if (move.piece === PAWN) {
      half_moves = 0
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      half_moves = 0
    } else {
      half_moves++
    }

    if (turn === BLACK) {
      move_number++
    }
    turn = swap_color(turn)
  }

  function undo_move() {
    var old = history.pop()
    if (old == null) {
      return null
    }

    var move = old.move
    kings = old.kings
    turn = old.turn
    castling = old.castling
    ep_square = old.ep_square
    half_moves = old.half_moves
    move_number = old.move_number

    var us: Side = turn
    var them: Side = swap_color(turn)

    const boardFrom = board[move.to]
    if (boardFrom != null) {
      boardFrom.type = move.piece // to undo any promotions
      board[move.from] = boardFrom
    } else {
      board[move.from] = null
    }

    board[move.to] = null

    if (move.flags & BITS.CAPTURE) {
      if (move.captured) {
        board[move.to] = { type: move.captured, color: them }
      }
    } else if (move.flags & BITS.EP_CAPTURE) {
      var index
      if (us === BLACK) {
        index = move.to - 16
      } else {
        index = move.to + 16
      }
      board[index] = { type: "p", color: them }
    }

    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      let castling_to
      let castling_from
      if (move.flags & BITS.KSIDE_CASTLE) {
        castling_to = move.to + 1
        castling_from = move.to - 1
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        castling_to = move.to - 2
        castling_from = move.to + 1
      }

      if (castling_to != null && castling_from != null) {
        board[castling_to] = board[castling_from]
        board[castling_from] = null
      }
    }

    return move
  }

  /* this function is used to uniquely identify ambiguous moves */
  function get_disambiguator(move: InternalMove) {
    var moves = generate_moves()

    var from = move.from
    var to = move.to
    var piece = move.piece

    var ambiguities = 0
    var same_rank = 0
    var same_file = 0

    for (var i = 0, len = moves.length; i < len; i++) {
      var ambig_from = moves[i].from
      var ambig_to = moves[i].to
      var ambig_piece = moves[i].piece

      /* if a move of the same piece type ends on the same to square, we'll
       * need to add a disambiguator to the algebraic notation
       */
      if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
        ambiguities++

        if (rank(from) === rank(ambig_from)) {
          same_rank++
        }

        if (file(from) === file(ambig_from)) {
          same_file++
        }
      }
    }

    if (ambiguities > 0) {
      /* if there exists a similar moving piece on the same rank and file as
       * the move in question, use the square as the disambiguator
       */
      if (same_rank > 0 && same_file > 0) {
        return algebraic(from)
      } else if (same_file > 0) {
        /* if the moving piece rests on the same file, use the rank symbol as the
         * disambiguator
         */
        return algebraic(from).charAt(1)
      } else {
        /* else use the file symbol */
        return algebraic(from).charAt(0)
      }
    }

    return ""
  }

  /*****************************************************************************
   * UTILITY FUNCTIONS
   ****************************************************************************/
  function rank(i: number) {
    return i >> 4
  }

  function file(i: number) {
    return i & 15
  }

  function algebraic(i: number): Square {
    var f = file(i),
      r = rank(i)
    return ("abcdefgh".substring(f, f + 1) +
      "87654321".substring(r, r + 1)) as Square
  }

  function swap_color(c: Side) {
    return c === WHITE ? BLACK : WHITE
  }

  function is_digit(c: string) {
    return "0123456789".indexOf(c) !== -1
  }

  /* pretty = external move object */
  function make_pretty(ugly_move: InternalMove): Move {
    const generateFlags = (ugly_move: InternalMove) => {
      let flags = ""
      const keys: Flag[] = Object.keys(BITS) as Flag[]
      keys.forEach(flag => {
        if (BITS[flag] & ugly_move.flags) {
          flags += FLAGS[flag]
        }
      })
      return flags
    }

    return {
      color: ugly_move.color,
      san: move_to_san(ugly_move),
      to: algebraic(ugly_move.to),
      from: algebraic(ugly_move.from),
      flags: generateFlags(ugly_move),
      piece: ugly_move.piece,
      captured: ugly_move.captured,
      promotion: ugly_move.promotion,
    }
  }

  return {
    moves: function() {
      /* The internal representation of a chess move is in 0x88 format, and
       * not meant to be human-readable.  The code below converts the 0x88
       * square coordinates to algebraic coordinates.  It also prunes an
       * unnecessary move keys resulting from a verbose call.
       */

      var ugly_moves = generate_moves()
      var moves = []

      for (var i = 0, len = ugly_moves.length; i < len; i++) {
        moves.push(make_pretty(ugly_moves[i]))
      }

      return moves
    },

    validate_fen: function(fen) {
      return validate_fen(fen)
    },

    fen: function() {
      return generate_fen()
    },

    move: function(move: ShortMove): Move | null {
      var move_obj = null
      var moves = generate_moves()
      /* convert the pretty move object to an ugly move object */
      for (var i = 0, len = moves.length; i < len; i++) {
        if (
          move.from === algebraic(moves[i].from) &&
          move.to === algebraic(moves[i].to) &&
          (!("promotion" in moves[i]) || move.promotion === moves[i].promotion)
        ) {
          move_obj = moves[i]
          break
        }
      }

      /* failed to find move */
      if (!move_obj) {
        return null
      }

      /* need to make a copy of move because we can't generate SAN after the
       * move is made
       */
      const pretty_move: Move = make_pretty(move_obj)

      make_move(move_obj)

      return pretty_move
    },
  }
}

export { ChessInstance, Move, ShortMove, Piece, PieceType, Side, Square }
export default Chess
