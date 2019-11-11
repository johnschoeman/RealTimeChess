import React, { createContext } from "react"

import { GameHelpers } from "../../utils"
import { Board, Tile } from "../../utils/game_helpers"
import { GameState, initialGameState, useGameState } from "../game_hooks"

const PlaygroundContext = createContext<GameState>(initialGameState)

interface PlaygroundProviderProps {
  children: JSX.Element
}

const PlaygroundProvider = ({ children }: PlaygroundProviderProps) => {
  const handleAttack = (board: Board, fromTile: Tile, toTile: Tile): void => {
    const movePiece = (fromTile: Tile, toTile: Tile): void => {
      const newBoard = GameHelpers.updateBoard(board, fromTile, toTile)
      setBoard(newBoard)
    }
    movePiece(fromTile, toTile)
  }

  const {
    board,
    setBoard,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
    resetBoard,
  } = useGameState({ handleAttack, tick: () => {} })

  return (
    <PlaygroundContext.Provider
      value={{
        board,
        userSelectedTile,
        computerSelectedTile,
        resetBoard: resetBoard,
        selectUserTile: selectUserTile,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}

export { PlaygroundProvider }
export default PlaygroundContext
