import React, { createContext, useState } from "react"

import { useGameState, GameState } from "../game_hooks"
import { GameHelpers } from "../../utils"
import { Side, black, white } from "../../utils/chess/chess"
import { Tile, Board } from "../../utils/game_helpers"

export interface ThreeKingsGameState extends GameState {
  userLives: number
  computerLives: number
}

export const initialGameState: ThreeKingsGameState = {
  board: GameHelpers.initialBoard,
  userSelectedTile: null,
  computerSelectedTile: null,
  countdownCount: 3,
  userLives: 3,
  computerLives: 3,
  resetBoard: () => {},
  selectUserTile: () => {},
}

const ThreeKingsContext = createContext<ThreeKingsGameState>(initialGameState)

interface ThreeKingsProviderProps {
  children: JSX.Element
}

const ThreeKingsProvider = ({ children }: ThreeKingsProviderProps) => {
  const [userLives, setUserLives] = useState<number>(3)
  const [computerLives, setComputerLives] = useState<number>(3)

  const decideWinner = (): Side | null => {
    if (computerLives === 0) {
      return white
    } else if (userLives === 0) {
      return black
    } else {
      return null
    }
  }

  const handleAttack = (
    board: Board,
    fromTile: Tile,
    toTile: Tile,
    side: Side
  ): void => {
    const isMoveValid = GameHelpers.validMove(board, fromTile, toTile, side)
    const toPiece = GameHelpers.getPiece(board, toTile)

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
        setUserLives(userLives - 1)
        removePiece(fromTile)
      } else if (fenId === "k") {
        setComputerLives(computerLives - 1)
        removePiece(fromTile)
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
    countdownCount,
    selectUserTile,
    resetBoard,
  } = useGameState(handleAttack, decideWinner)

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
