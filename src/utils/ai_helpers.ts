import Chess, { ChessInstance, ShortMove } from "./chess/chess"
import {
  Board,
  Side,
  generateFen,
  squareToRCTile,
  getPiece,
} from "./game_helpers"
import { sample } from "./array_helpers"

export type Color = "b" | "w"
export type Piece = "p" | "n" | "b" | "r" | "q" | "k"
export interface Move extends ShortMove {
  color: "b" | "w"
  flags: string
  piece: Piece
  san: string
  captured?: Piece
}

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
  const validation = chessInstance.validate_fen(fen)
  if (validation.valid) {
    try {
      return chessInstance.moves({ verbose: true })
    } catch (e) {
      console.log("chess instance errored looking for moves for: ", fen)
      return []
    }
  } else {
    console.log("invalid fen: ", validation)
    return []
  }
}
