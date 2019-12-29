import React, { createContext, useContext } from "react"

import UIContext from '../UIContext'
import { GameHelpers } from "../../utils"
import { Side } from "../../utils/chess/chess"
import { Board, Tile } from "../../utils/game_helpers"
import {
  GameStateWithCountdown,
  initialGameStateWithCountdown,
  useGameState,
  useCountDown,
} from "../game_hooks"

const ClassicContext = createContext<GameStateWithCountdown>(
  initialGameStateWithCountdown
)

interface ClassicProviderProps {
  children: JSX.Element
}

const ClassicProvider = ({ children }: ClassicProviderProps) => {
  const { animateMove } = useContext(UIContext)

  const handleAttack = (
    board: Board,
    fromTile: Tile,
    toTile: Tile,
    side: Side
  ): void => {
    const isMoveValid = GameHelpers.validMove(board, fromTile, toTile, side)
    if (isMoveValid) {
      animateMove(fromTile, toTile)
      queueMove(fromTile, toTile, side, 5000)
    }
  }

  const {
    board,
    queueMove,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
    resetBoard,
    setGameIsActive,
  } = useGameState({ handleAttack })
  const { countdownCount } = useCountDown(3, () => setGameIsActive(true))

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
