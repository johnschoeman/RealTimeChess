import { Color } from '../styles'

export function nullPiece() {
  this.color = null
  this.isPiece = false
  this.name = 'Null'
  this.style = {}
  this.moves = []
}

export function pawn(color) {
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
}

export function knight(color) {
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
  this.moves = [[2, -1],[2, 1],[1, 2],[-1, 2],[-2, 1],[-2, -1],[-1, -2],[1, -2]]
}

export function bishop(color) {
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
  this.moves = [
    ...[...Array(8)].map((_,i) => [i, i]),
    ...[...Array(8)].map((_,i) => [-i, i]),
    ...[...Array(8)].map((_,i) => [i, -i]),
    ...[...Array(8)].map((_,i) => [-i, -i])
  ]
}

export function rook(color) {
  this.color = color
  this.isPiece = true
  this.name = 'Rook'
  this.style = {
    backgroundColor: color,
    borderWidth: 2,
    width: 25,
    height: 30,
  }
  this.moves = [
    ...[...Array(8)].map((_,i) => [0, i]),
    ...[...Array(8)].map((_,i) => [0, -i]),
    ...[...Array(8)].map((_,i) => [i, 0]),
    ...[...Array(8)].map((_,i) => [-i, 0])
  ]
}

export function queen(color) {
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
  this.moves = [
    ...[...Array(8)].map((_,i) => [0, i]),
    ...[...Array(8)].map((_,i) => [0, -i]),
    ...[...Array(8)].map((_,i) => [i, 0]),
    ...[...Array(8)].map((_,i) => [-i, 0]),
    ...[...Array(8)].map((_,i) => [i, i]),
    ...[...Array(8)].map((_,i) => [-i, i]),
    ...[...Array(8)].map((_,i) => [i, -i]),
    ...[...Array(8)].map((_,i) => [-i, -i])
  ]
}

export function king(color) {
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
    [1,0],[1,1],[0,1],[-1,1],[0,-1],[-1,-1],[0,-1],[1,-1]
  ]
}
