import { Color } from '../styles'

function Piece(color) {
  this.color = color
  this.isPiece = true
  this.moves = [[1, 0]]
}

export default Piece
