import React, { createContext } from "react"

import { GameHelpers } from "../../utils"
import { Side } from "../../utils/chess/chess"
import { Board, Tile } from "../../utils/game_helpers"
import { GameState, useGameState } from "../game_hooks"

export const initialGameState: GameState = {
  board: GameHelpers.createBoard(),
  userSelectedTile: null,
  computerSelectedTile: null,
  countdownCount: 3,
  resetBoard: () => {},
  selectUserTile: () => {},
}

const ClassicContext = createContext<GameState>(initialGameState)

interface ClassicProviderProps {
  children: JSX.Element
}

const ClassicProvider = ({ children }: ClassicProviderProps) => {
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

    const isMoveValid = GameHelpers.validMove(board, fromTile, toTile, side)
    if (isMoveValid) {
      movePiece(fromTile, toTile)
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
  } = useGameState(handleAttack)

  return (
    <ClassicContext.Provider
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
    </ClassicContext.Provider>
  )
}

export { ClassicProvider }
export default ClassicContext
