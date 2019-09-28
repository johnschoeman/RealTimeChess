type Side = "black" | "white" | ""

interface Piece {
  kind: string
  side: Side
  isPiece: boolean
  moves: number[][]
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
  this.side = ""
  this.isPiece = false
  this.moves = []
} as any) as { new (): Empty }

const pawn = (function pawn(this: Pawn, side: Side) {
  this.kind = "pawn"
  this.side = side
  this.isPiece = true
  this.moves = [[1, 0]]
} as any) as { new (side: Side): Pawn }

const knight = (function knight(this: Knight, side: Side) {
  this.kind = "knight"
  this.side = side
  this.isPiece = true
  this.moves = [
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
  ]
} as any) as { new (side: Side): Knight }

const bishop = (function bishop(this: Bishop, side: Side) {
  this.kind = "bishop"
  this.side = side
  this.isPiece = true
  this.moves = generateBishopMoves()
} as any) as { new (side: Side): Bishop }

const rook = (function rook(this: Rook, side: Side) {
  this.kind = "rook"
  this.side = side
  this.isPiece = true
  this.moves = generateRookMoves()
} as any) as { new (side: Side): Rook }

const queen = (function queen(this: Queen, side: Side) {
  this.kind = "queen"
  this.side = side
  this.isPiece = true
  this.moves = generateQueenMoves()
} as any) as { new (side: Side): Queen }

const king = (function king(this: King, side: Side) {
  this.kind = "king"
  this.side = side
  this.isPiece = true
  this.moves = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [0, -1],
    [-1, -1],
    [0, -1],
    [1, -1],
  ]
} as any) as { new (side: Side): King }

function generateQueenMoves() {
  let moves = []
  for (let i = 0; i < 8; i++) {
    moves.push([i, 0])
    moves.push([-i, 0])
    moves.push([0, i])
    moves.push([0, -i])
    moves.push([i, i])
    moves.push([-i, i])
    moves.push([i, -i])
    moves.push([-i, -i])
  }
  return moves
}

function generateBishopMoves() {
  let moves = []
  for (let i = 0; i < 8; i++) {
    moves.push([i, i])
    moves.push([-i, i])
    moves.push([i, -i])
    moves.push([-i, -i])
  }
  return moves
}

function generateRookMoves() {
  let moves = []
  for (let i = 0; i < 8; i++) {
    moves.push([0, i])
    moves.push([0, -i])
    moves.push([i, 0])
    moves.push([-i, 0])
  }
  return moves
}

export { empty, pawn, knight, bishop, rook, queen, king }
export {
  Piece as PieceInterface,
  PieceType,
  Side,
  Empty,
  Pawn,
  Knight,
  Bishop,
  Rook,
  Queen,
  King,
}
