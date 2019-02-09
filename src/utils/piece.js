import { Color } from '../styles'

function Piece(color) {
  this.color = color
  this.text = 'P'
  this.isPiece = true
  this.style = {
    backgroundColor: color,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: Color.pieceBorder,
  }
}

export default Piece
