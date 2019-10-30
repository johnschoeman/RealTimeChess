import Chess, { Side, Move, ChessInstance } from "../chess/chess"
import { Board, generateFen, squareToRCTile } from "../game_helpers"

export function validMoves(board: Board, side: Side): Move[] {
  const fen = generateFen(board, side)
  const chessInstance: ChessInstance = Chess(fen)
  try {
    const allMoves = chessInstance.moves()
    return allMoves.filter((move: Move) => {
      const { colIdx, rowIdx } = squareToRCTile(move.from)
      const piece = board[rowIdx][colIdx]
      return !(piece.cooldown > 0)
    })
  } catch (e) {
    console.log("chess instance errored looking for moves for: ", fen)
    return []
  }
}
