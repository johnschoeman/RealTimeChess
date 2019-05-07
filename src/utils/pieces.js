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
    borderRadius: 12,
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
