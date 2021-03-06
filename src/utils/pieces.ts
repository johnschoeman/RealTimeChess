import { Side, Empty, Piece, black } from "./chess/chess"

interface Pawn extends Piece {}
interface Knight extends Piece {}
interface Bishop extends Piece {}
interface Rook extends Piece {}
interface Queen extends Piece {}
interface King extends Piece {}

const empty = (function empty(this: Empty) {
  this.kind = "empty"
  this.isPiece = false
  this.side = null
  this.fenId = null
} as any) as { new (): Empty }

const pawn = (function pawn(this: Pawn, side: Side) {
  this.kind = "pawn"
  this.side = side
  this.isPiece = true
  this.fenId = side === black ? "p" : "P"
  this.cooldown = 0
} as any) as { new (side: Side): Pawn }

const knight = (function knight(this: Knight, side: Side) {
  this.kind = "knight"
  this.side = side
  this.isPiece = true
  this.fenId = side === black ? "n" : "N"
  this.cooldown = 0
} as any) as { new (side: Side): Knight }

const bishop = (function bishop(this: Bishop, side: Side) {
  this.kind = "bishop"
  this.side = side
  this.isPiece = true
  this.fenId = side === black ? "b" : "B"
  this.cooldown = 0
} as any) as { new (side: Side): Bishop }

const rook = (function rook(this: Rook, side: Side) {
  this.kind = "rook"
  this.side = side
  this.isPiece = true
  this.fenId = side === black ? "r" : "R"
  this.cooldown = 0
} as any) as { new (side: Side): Rook }

const queen = (function queen(this: Queen, side: Side) {
  this.kind = "queen"
  this.side = side
  this.isPiece = true
  this.fenId = side === black ? "q" : "Q"
  this.cooldown = 0
} as any) as { new (side: Side): Queen }

const king = (function king(this: King, side: Side) {
  this.kind = "king"
  this.side = side
  this.isPiece = true
  this.fenId = side === black ? "k" : "K"
  this.cooldown = 0
} as any) as { new (side: Side): King }

export { empty, pawn, knight, bishop, rook, queen, king }
export {
  Piece as PieceInterface,
  Empty,
  Pawn,
  Knight,
  Bishop,
  Rook,
  Queen,
  King,
}
