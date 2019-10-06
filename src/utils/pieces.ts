import { Side } from "./game_helpers"

export type FenCode =
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
  | "0"

interface Piece {
  kind: string
  side: Side | null
  isPiece: boolean
  fenCode: FenCode
}

interface Empty extends Piece {}
interface Pawn extends Piece {}
interface Knight extends Piece {}
interface Bishop extends Piece {}
interface Rook extends Piece {}
interface Queen extends Piece {}
interface King extends Piece {}

type PieceType = Empty | Pawn | Knight | Bishop | Rook | Queen | King

const empty = (function empty(this: Empty) {
  this.kind = "empty"
  this.side = null
  this.isPiece = false
  this.fenCode = "0"
} as any) as { new (): Empty }

const pawn = (function pawn(this: Pawn, side: Side) {
  this.kind = "pawn"
  this.side = side
  this.isPiece = true
  this.fenCode = side === "black" ? "p" : "P"
} as any) as { new (side: Side): Pawn }

const knight = (function knight(this: Knight, side: Side) {
  this.kind = "knight"
  this.side = side
  this.isPiece = true
  this.fenCode = side === "black" ? "n" : "N"
} as any) as { new (side: Side): Knight }

const bishop = (function bishop(this: Bishop, side: Side) {
  this.kind = "bishop"
  this.side = side
  this.isPiece = true
  this.fenCode = side === "black" ? "b" : "B"
} as any) as { new (side: Side): Bishop }

const rook = (function rook(this: Rook, side: Side) {
  this.kind = "rook"
  this.side = side
  this.isPiece = true
  this.fenCode = side === "black" ? "r" : "R"
} as any) as { new (side: Side): Rook }

const queen = (function queen(this: Queen, side: Side) {
  this.kind = "queen"
  this.side = side
  this.isPiece = true
  this.fenCode = side === "black" ? "q" : "Q"
} as any) as { new (side: Side): Queen }

const king = (function king(this: King, side: Side) {
  this.kind = "king"
  this.side = side
  this.isPiece = true
  this.fenCode = side === "black" ? "k" : "K"
} as any) as { new (side: Side): King }

export { empty, pawn, knight, bishop, rook, queen, king }
export {
  Piece as PieceInterface,
  PieceType,
  Empty,
  Pawn,
  Knight,
  Bishop,
  Rook,
  Queen,
  King,
}
