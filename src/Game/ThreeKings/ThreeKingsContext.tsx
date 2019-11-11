import React, { createContext, useState } from "react"

import { GameHelpers } from "../../utils"
import { Side } from "../../utils/chess/chess"
import { Tile, Board } from "../../utils/game_helpers"
import {
  useGameState,
  GameStateWithCountdown,
  initialGameStateWithCountdown,
  useCountDown,
} from "../game_hooks"

export interface ThreeKingsGameState extends GameStateWithCountdown {
  userLives: number
  computerLives: number
}

export const initialThreeKingsGameState: ThreeKingsGameState = {
  ...initialGameStateWithCountdown,
  userLives: 3,
  computerLives: 3,
}

const ThreeKingsContext = createContext<ThreeKingsGameState>(
  initialThreeKingsGameState
)

interface ThreeKingsProviderProps {
  children: JSX.Element
}

const ThreeKingsProvider = ({ children }: ThreeKingsProviderProps) => {
  const [userLives, setUserLives] = useState<number>(3)
  const [computerLives, setComputerLives] = useState<number>(3)

  const handleAttack = (
    board: Board,
    fromTile: Tile,
    toTile: Tile,
    side: Side
  ): void => {
    const toPiece = GameHelpers.getPiece(board, toTile)
    const isMoveValid = GameHelpers.validMove(board, fromTile, toTile, side)

    const removePiece = (tile: Tile) => {
      const newBoard = GameHelpers.removePiece(board, tile)
      setBoard(newBoard)
    }
    const movePiece = (fromTile: Tile, toTile: Tile) => {
      const newBoard = GameHelpers.updateBoard(board, fromTile, toTile)
      setBoard(newBoard)
    }

    if (isMoveValid) {
      const { fenId } = toPiece

      if (fenId === "K") {
        if (userLives === 1) {
          movePiece(fromTile, toTile)
        } else {
          removePiece(fromTile)
        }
        setUserLives(userLives - 1)
      } else if (fenId === "k") {
        if (computerLives === 1) {
          movePiece(fromTile, toTile)
        } else {
          removePiece(fromTile)
        }
        setComputerLives(computerLives - 1)
      } else {
        movePiece(fromTile, toTile)
      }
    }
  }

  const {
    board,
    setBoard,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
    resetBoard,
    setGameIsActive,
  } = useGameState({ handleAttack })
  const { countdownCount } = useCountDown(3, () => setGameIsActive(true))

  return (
    <ThreeKingsContext.Provider
      value={{
        board,
        userSelectedTile,
        computerSelectedTile,
        countdownCount,
        userLives,
        computerLives,
        resetBoard: resetBoard,
        selectUserTile: selectUserTile,
      }}
    >
      {children}
    </ThreeKingsContext.Provider>
  )
}

export { ThreeKingsProvider }
export default ThreeKingsContext
