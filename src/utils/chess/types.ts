// Type definitions for chess.js 0.10
// Project: https://github.com/jhlywa/chess.js
// Definitions by: Jacob Fischer <https://github.com/JacobFischer>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export type Side = "b" | "w"

export const black: Side = "b"
export const white: Side = "w"

export interface Empty {
  kind: "empty"
  isPiece: false
  type: null
  side: null
  fenId: null
  color: null
}

export interface Piece {
  kind: string
  /**
   * The type of the piece to place
   * - "p" for Pawn
   * - "n" for Knight
   * - "b" for Bishop
   * - "r" for Rook
   * - "q" for Queen
   * - "k" for King
   */
  type: PieceType
  side?: Side
  /**
   * The color of the piece
   * - "b" for Black
   * - "w" for White
   */
  color: Side
  isPiece: boolean
  fenId: FenId
}

/**
 * tuple of a parsed fen code
 * rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
 * boardState currentPlayer castleAvailablity EnPassanteAvailabilty halfMoveClock moveCount
 */
export type FenCode = [string, Side, string, Square | "-", number, number]

export type FenId =
  | "r"
  | "n"
  | "b"
  | "k"
  | "q"
  | "p"
  | "R"
  | "N"
  | "B"
  | "K"
  | "Q"
  | "P"

/**
 * One of the possible sqaures on a chess board in san format,
 * e.g. "a8" to "h1".
 */
// prettier-ignore
export type Square =
  | "a8" | "b8" | "c8" | "d8" | "e8" | "f8" | "g8" | "h8"
  | "a7" | "b7" | "c7" | "d7" | "e7" | "f7" | "g7" | "h7"
  | "a6" | "b6" | "c6" | "d6" | "e6" | "f6" | "g6" | "h6"
  | "a5" | "b5" | "c5" | "d5" | "e5" | "f5" | "g5" | "h5"
  | "a4" | "b4" | "c4" | "d4" | "e4" | "f4" | "g4" | "h4"
  | "a3" | "b3" | "c3" | "d3" | "e3" | "f3" | "g3" | "h3"
  | "a2" | "b2" | "c2" | "d2" | "e2" | "f2" | "g2" | "h2"
  | "a1" | "b1" | "c1" | "d1" | "e1" | "f1" | "g1" | "h1"

/**
 * Partial data about a chess move including the from and to square, and if a
 * promotion occured.
 */
export interface ShortMove {
  /**
   * The location the piece is moving from.
   * Must be in san format, e.g "h8"
   */
  from: Square

  /**
   * The location the piece is moving to.
   * Must be in san format, e.g "a1"
   */
  to: Square

  /**
   * If this move results in a promotion, this will have the unit promotion.
   * - "n" for Knight
   * - "b" for Bishop
   * - "r" for Rook
   * - "q" for Queen
   */
  promotion?: "n" | "b" | "r" | "q"
}

/**
 * The full data about a chess move
 */
export interface Move extends ShortMove {
  /**
   * The color of the piece that moved
   * - "b" for Black
   * - "w" for White
   */
  color: Side

  /** Flags indicating what occurred, combined into one string */
  flags: string

  /**
   * The type of the piece that moved
   * - "p" for Pawn
   * - "n" for Knight
   * - "b" for Bishop
   * - "r" for Rook
   * - "q" for Queen
   * - "k" for King
   */
  piece: PieceType

  /** The Standard Algebraic Notation (SAN) representation of the move */
  san: string

  /**
   * If an enemy piece was captured this is their type.
   * - "p" for Pawn
   * - "n" for Knight
   * - "b" for Bishop
   * - "r" for Rook
   * - "q" for Queen
   */
  captured?: "p" | "n" | "b" | "r" | "q" | "k"
}

export type Promotion = "n" | "b" | "r" | "q"
export type PieceType = "p" | "n" | "b" | "r" | "q" | "k"

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
export interface InternalMove {
  color: Side
  from: number
  to: number
  flags: number
  piece: PieceType
  captured?: PieceType
  promotion?: Promotion
}

export type InternalPiece = {
  type: PieceType
  color: Side
}

export type InternalBoard = (InternalPiece | null)[]

export interface ChessInstance {
  /**
   * Returns a list of legal moves from the current position.
   */
  moves(): Move[]

  /**
   * Returns the FEN string for the current position.
   * @returns the FEN string for the current position.
   */
  fen(): string

  /**
   * Attempts to make a move on the board, returning a move object if the
   * move was legal, otherwise null.
   * by passing .move() a move object (only the 'to', 'from', and when
   * necessary 'promotion', fields are needed).
   * @returns The move as a full object is returned if the move was valid,
   * and the chess board's state changes.
   * If the move was invalid, null is returned and the state does not update.
   */
  move(move: ShortMove): Move | null
}
