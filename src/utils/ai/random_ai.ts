import Chess, { ChessInstance, Move, Side } from "../chess/chess"
import { Board, generateFen, squareToRCTile, getPiece } from "../game_helpers"
import { sample } from "../array_helpers"

export const selectMove = (board: Board, side: Side): Move | null => {
  const moves: Move[] = validMoves(board, side)

  const attackingMoves: Move[] = moves.filter((move: Move) => {
    const { flags } = move
    return flags.includes("c") || flags.includes("e")
  })

  const kingAttakingMoves: Move[] = attackingMoves.filter((move: Move) => {
    const toTile = squareToRCTile(move.to)
    const toPiece = getPiece(board, toTile)
    return toPiece.kind === "king"
  })

  if (kingAttakingMoves.length !== 0) {
    return sample<Move>(kingAttakingMoves)
  } else if (attackingMoves.length !== 0) {
    return sample<Move>(attackingMoves)
  } else {
    return sample<Move>(moves)
  }
}

export function validMoves(board: Board, side: Side): Move[] {
  const fen = generateFen(board, side)
  const chessInstance: ChessInstance = Chess(fen)
  try {
    return chessInstance.moves()
  } catch (e) {
    console.log("chess instance errored looking for moves for: ", fen)
    return []
  }
}
