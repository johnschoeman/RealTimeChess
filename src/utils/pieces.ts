import { Color } from '../styles'

interface Piece {
  color: string
  isPiece: boolean
  name: string
  style: object
  moves: number[][]
}

const nullPiece = (function nullPiece(this: Piece) {
  this.color = ''
  this.isPiece = false
  this.name = 'Null'
  this.style = {}
  this.moves = []
} as any) as { new (): Piece }

const pawn = (function pawn(this: Piece, color: string) {
  this.color = color
  this.isPiece = true
  this.name = 'Pawn'
  this.style = {
    backgroundColor: color,
    borderWidth: 2,
    borderRadius: 15,
    width: 20,
    maxHeight: 20,
    borderColor: Color.pieceBorder,
  }
  this.moves = [[1, 0]]
} as any) as { new (color: string): Piece }

const knight = (function knight(this: Piece, color: string) {
  this.color = color
  this.isPiece = true
  this.name = 'Knight'
  this.style = {
    backgroundColor: color,
    borderWidth: 2,
    borderRadius: 6,
    width: 20,
    borderColor: Color.pieceBorder,
  }
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
} as any) as { new (color: string): Piece }

const bishop = (function bishop(this: Piece, color: string) {
  this.color = color
  this.isPiece = true
  this.name = 'Bishop'
  this.style = {
    backgroundColor: color,
    width: 15,
    maxHeight: 25,
    borderWidth: 2,
    transform: [{ skewX: '135deg' }],
  }
  this.moves = generateBishopMoves()
} as any) as { new (color: string): Piece }

const rook = (function rook(this: Piece, color: string) {
  this.color = color
  this.isPiece = true
  this.name = 'Rook'
  this.style = {
    backgroundColor: color,
    borderWidth: 2,
    width: 25,
    height: 30,
  }
  this.moves = generateRookMoves()
} as any) as { new (color: string): Piece }

const queen = (function queen(this: Piece, color: string) {
  this.color = color
  this.isPiece = true
  this.name = 'Queen'
  this.style = {
    backgroundColor: color,
    borderWidth: 2,
    transform: [{ rotate: '45deg' }],
    width: 25,
    maxHeight: 25,
  }
  this.moves = generateQueenMoves()
} as any) as { new (color: string): Piece }

const king = (function king(this: Piece, color: string) {
  this.color = color
  this.isPiece = true
  this.name = 'King'
  this.style = {
    backgroundColor: color,
    borderWidth: 15,
    borderLeftColor: Color.tileBlack,
    borderRightColor: Color.tileBlack,
    borderTopColor: color,
    borderBottomColor: color,
  }
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
} as any) as { new (color: string): Piece }

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

export { Piece, nullPiece, pawn, knight, bishop, rook, queen, king }
