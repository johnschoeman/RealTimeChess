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
    width: 30,
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
    borderWidth: 15,
    width: 0,
    height: 0,
    borderLeftColor: Color.white,
    borderRightColor: Color.white,
    borderBottomColor: color,
  }
  this.moves = [
    ...[...Array(8)].map((_,i) => [i, i]),
    ...[...Array(8)].map((_,i) => [-i, i]),
    ...[...Array(8)].map((_,i) => [i, -i]),
    ...[...Array(8)].map((_,i) => [-i, -i])
  ]
}
