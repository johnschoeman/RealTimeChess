import React, { createContext, useState, useEffect } from "react"
import { Move } from "chess.js"

import { GameHelpers, ArrayHelpers } from "./utils"
import { Tile } from "./utils/game_helpers"
import { Side } from "./utils/pieces"

interface GameState {
  board: GameHelpers.Board
  userSelectedTile: Tile | null
  computerSelectedTile: Tile | null
  resetBoard: any
  selectUserTile: any
}

const initialGameState: GameState = {
  board: GameHelpers.initialBoard,
  userSelectedTile: null,
  computerSelectedTile: null,
  resetBoard: () => {},
  selectUserTile: () => {},
}

const GameContext = createContext<GameState>(initialGameState)

const computerClockSpeed = 300

interface GameProviderProps {
  children: JSX.Element
}

const GameProvider = ({ children }: GameProviderProps) => {
  const [board, setBoard] = useState<GameHelpers.Board>(
    GameHelpers.initialBoard
  )
  const [userSelectedTile, setUserSelectedTile] = useState<Tile | null>(null)
  const [computerSelectedTile, setComputerSelectedTile] = useState<Tile | null>(
    null
  )
  const [computerCurrentMove, setComputerCurrentMove] = useState<Move | null>(
    null
  )
  const [gameStep, setGameStep] = useState<number>(0)

  const tick = (): void => {
    setGameStep(gameStep + 1)
    const computerNextTile = getNextComputerTile()
    selectComputerTile(computerNextTile)
  }

  useEffect(() => {
    const intervalID = setInterval(tick, computerClockSpeed)

    return () => {
      clearInterval(intervalID)
    }
  })

  const getNextComputerTile = (): Tile | null => {
    if (computerCurrentMove == null) {
      const validMoves = GameHelpers.validMoves(board, "black")
      const move = ArrayHelpers.sample<Move>(validMoves)
      if (move == null) {
        return null
      }
      setComputerCurrentMove(move)
      return null
    } else if (computerSelectedTile == null) {
      return GameHelpers.squareToRCTile(computerCurrentMove.from)
    } else {
      setComputerCurrentMove(null)
      return GameHelpers.squareToRCTile(computerCurrentMove.to)
    }
  }

  const resetBoard = () => {
    setBoard(GameHelpers.initialBoard)
    setComputerCurrentMove(null)
    setComputerSelectedTile(null)
    setUserSelectedTile(null)
  }

  const selectComputerTile = (toTile: Tile | null) => {
    const callBack = (tile: Tile) => {
      setComputerSelectedTile(tile)
    }
    if (toTile !== null) {
      const fromTile = computerSelectedTile
      selectTile(fromTile, toTile, "black", callBack)
    }
  }

  const selectUserTile = (toTile: Tile) => {
    const fromTile = userSelectedTile
    const callBack = (tile: Tile) => {
      setUserSelectedTile(tile)
    }
    selectTile(fromTile, toTile, "white", callBack)
  }

  const selectTile = (
    fromTile: Tile | null,
    toTile: Tile | null,
    side: Side,
    callBack: any
  ): void => {
    if (toTile === null) {
      callBack(null)
      return
    } else if (fromTile === null) {
      const { rowIdx: toRow, colIdx: toCol } = toTile
      const toPiece = board[toRow][toCol]
      if (toPiece.isPiece) {
        callBack({ rowIdx: toRow, colIdx: toCol })
      }
    } else if (
      fromTile.rowIdx === toTile.rowIdx &&
      fromTile.colIdx === toTile.colIdx
    ) {
      callBack(null)
    } else {
      if (GameHelpers.validMove(board, fromTile, toTile, side)) {
        movePiece(fromTile, toTile)
        callBack(null)
      }
    }
  }

  const movePiece = (fromTile: Tile, toTile: Tile) => {
    const newBoard = GameHelpers.updateBoard(board, fromTile, toTile)
    setBoard(newBoard)
  }

  return (
    <GameContext.Provider
      value={{
        board,
        userSelectedTile,
        computerSelectedTile,
        resetBoard: resetBoard,
        selectUserTile: selectUserTile,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export { GameProvider }
export default GameContext
