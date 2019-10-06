import React, { createContext, useState, useEffect } from "react"

import { AiHelpers, GameHelpers } from "./utils"
import { Side } from "./utils/game_helpers"

export interface GameState {
  board: GameHelpers.Board
  userSelectedTile: GameHelpers.Tile | null
  computerSelectedTile: GameHelpers.Tile | null
  winner: GameHelpers.Side | null
  resetBoard: any
  selectUserTile: any
}

export const initialGameState: GameState = {
  board: GameHelpers.initialBoard,
  userSelectedTile: null,
  computerSelectedTile: null,
  winner: null,
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
  const [
    userSelectedTile,
    setUserSelectedTile,
  ] = useState<GameHelpers.Tile | null>(null)
  const [
    computerSelectedTile,
    setComputerSelectedTile,
  ] = useState<GameHelpers.Tile | null>(null)
  const [
    computerCurrentMove,
    setComputerCurrentMove,
  ] = useState<AiHelpers.Move | null>(null)
  const [winner, setWinner] = useState<GameHelpers.Side | null>(null)
  const [gameStep, setGameStep] = useState<number>(0)

  const tick = (): void => {
    setGameStep(gameStep + 1)
    const currentWinner: Side | null = GameHelpers.winner(board)
    if (currentWinner == null) {
      const computerNextTile = getNextComputerTile()
      selectComputerTile(computerNextTile)
    } else {
      setWinner(currentWinner)
    }
  }

  useEffect(() => {
    const intervalID = setInterval(tick, computerClockSpeed)

    return () => {
      clearInterval(intervalID)
    }
  })

  const getNextComputerTile = (): GameHelpers.Tile | null => {
    if (computerCurrentMove == null) {
      const move = AiHelpers.selectMove(board, "black")
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
    setWinner(null)
    setGameStep(0)
  }

  const selectComputerTile = (toTile: GameHelpers.Tile | null) => {
    const callBack = (tile: GameHelpers.Tile) => {
      setComputerSelectedTile(tile)
    }
    if (toTile !== null) {
      const fromTile = computerSelectedTile
      selectTile(fromTile, toTile, "black", callBack)
    }
  }

  const selectUserTile = (toTile: GameHelpers.Tile) => {
    const fromTile = userSelectedTile
    const callBack = (tile: GameHelpers.Tile) => {
      setUserSelectedTile(tile)
    }
    selectTile(fromTile, toTile, "white", callBack)
  }

  const selectTile = (
    fromTile: GameHelpers.Tile | null,
    toTile: GameHelpers.Tile | null,
    side: GameHelpers.Side,
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
      } else {
        console.log("not a valid move: ", fromTile, toTile, side)
      }
    }
  }

  const movePiece = (fromTile: GameHelpers.Tile, toTile: GameHelpers.Tile) => {
    const newBoard = GameHelpers.updateBoard(board, fromTile, toTile)
    setBoard(newBoard)
  }

  return (
    <GameContext.Provider
      value={{
        board,
        userSelectedTile,
        computerSelectedTile,
        winner,
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
