import React, { createContext } from "react"

import { GameHelpers } from "../../utils"
import { Piece, Side } from "../../utils/chess/chess"
import { Board, Tile } from "../../utils/game_helpers"

import { useGameState, GameState } from "../game_hooks"

const initialGameState: GameState = {
  board: GameHelpers.createBoard(),
  userSelectedTile: null,
  computerSelectedTile: null,
  countdownCount: 3,
  resetBoard: () => {},
  selectUserTile: () => {},
}

const CooldownContext = createContext<GameState>(initialGameState)

interface CooldownProviderProps {
  children: JSX.Element
}

const CooldownProvider = ({ children }: CooldownProviderProps) => {
  const decrementCooldowns = (): void => {
    board.forEach(rank => {
      rank.forEach(file => {
        if (file.isPiece && file.cooldown && file.cooldown > 0) {
          file.cooldown = file.cooldown - 1
        }
      })
    })
  }

  const handleAttack = (
    board: Board,
    fromTile: Tile,
    toTile: Tile,
    side: Side
  ): void => {
    const movePiece = (fromTile: Tile, toTile: Tile): void => {
      const newBoard = GameHelpers.updateBoard(board, fromTile, toTile)
      setBoard(newBoard)
    }
    const fromPiece = GameHelpers.getPiece(board, fromTile)

    if (fromPiece.isPiece) {
      const isMoveValid =
        GameHelpers.validMove(board, fromTile, toTile, side) &&
        !pieceIsCoolingDown(fromPiece)
      if (isMoveValid) {
        updateCooldown(fromPiece)
        movePiece(fromTile, toTile)
      }
    }
  }

  const updateCooldown = (fromPiece: Piece): void => {
    fromPiece.cooldown = 10
  }

  const pieceIsCoolingDown = (piece: Piece): boolean => {
    return piece.cooldown && piece.cooldown > 0 ? true : false
  }

  const {
    board,
    setBoard,
    userSelectedTile,
    computerSelectedTile,
    countdownCount,
    selectUserTile,
    resetBoard,
  } = useGameState(handleAttack, decrementCooldowns)

  return (
    <CooldownContext.Provider
      value={{
        board,
        userSelectedTile,
        computerSelectedTile,
        countdownCount,
        resetBoard: resetBoard,
        selectUserTile: selectUserTile,
      }}
    >
      {children}
    </CooldownContext.Provider>
  )
}

export { CooldownProvider }
export default CooldownContext
