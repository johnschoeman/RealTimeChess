import React, { createContext, useContext, useState, useEffect } from "react"

import { GameHelpers } from "../../utils"
import { MinimaxAI } from "../../utils/ai"
import { Move, Side, black, white } from "../../utils/chess/chess"
import ArcadeContext from "../../ArcadeContext"

export interface GameState {
  board: GameHelpers.Board
  userSelectedTile: GameHelpers.Tile | null
  computerSelectedTile: GameHelpers.Tile | null
  countdownCount: number
  resetBoard: () => void
  selectUserTile: (toTile: GameHelpers.Tile) => void
}

export const initialGameState: GameState = {
  board: GameHelpers.initialBoard,
  userSelectedTile: null,
  computerSelectedTile: null,
  countdownCount: 3,
  resetBoard: () => {},
  selectUserTile: () => {},
}

const ClassicContext = createContext<GameState>(initialGameState)

const computerClockSpeed = 200

interface ClassicProviderProps {
  children: JSX.Element
}

const ClassicProvider = ({ children }: ClassicProviderProps) => {
  const { setCurrentWinner } = useContext(ArcadeContext)

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
  const [computerCurrentMove, setComputerCurrentMove] = useState<Move | null>(
    null
  )
  const [gameStep, setGameStep] = useState<number>(0)
  const [gameIsActive, setGameIsActive] = useState<boolean>(false)

  const [countdownCount, setCountdownCount] = useState<number>(3)
  const [isActive, setIsActive] = useState<boolean>(true)

  const tick = (): void => {
    if (gameIsActive) {
      setGameStep(gameStep + 1)
      const winner: Side | null = GameHelpers.winner(board)
      if (winner == null) {
        const computerNextTile = getNextComputerTile()
        selectComputerTile(computerNextTile)
      } else {
        setGameIsActive(false)
        setCurrentWinner(winner)
      }
    }
  }

  useEffect(() => {
    let intervalId: number = 0
    if (isActive) {
      intervalId = setInterval(() => {
        setCountdownCount((countdownCount: number) => countdownCount - 1)
      }, 1000)
      if (countdownCount < 0) {
        setIsActive(false)
        clearInterval(intervalId)
        setGameIsActive(true)
      }
    }
    return () => clearInterval(intervalId)
  }, [isActive, countdownCount])

  useEffect(() => {
    const intervalID = setInterval(tick, computerClockSpeed)
    return () => {
      clearInterval(intervalID)
    }
  })

  const getNextComputerTile = (): GameHelpers.Tile | null => {
    if (computerCurrentMove == null) {
      const move = MinimaxAI.selectMove(board, black)
      if (move == null) {
        return null
      }
      setComputerCurrentMove(move)
      return null
    } else if (computerSelectedTile == null) {
      return GameHelpers.squareToRCTile(computerCurrentMove.from)
    } else {
      setComputerCurrentMove(null)
      setComputerSelectedTile(null)
      return GameHelpers.squareToRCTile(computerCurrentMove.to)
    }
  }

  const resetBoard = () => {
    setBoard(GameHelpers.initialBoard)
    setComputerCurrentMove(null)
    setComputerSelectedTile(null)
    setUserSelectedTile(null)
    setGameStep(0)
  }

  const selectComputerTile = (toTile: GameHelpers.Tile | null) => {
    const callBack = (tile: GameHelpers.Tile) => {
      setComputerSelectedTile(tile)
    }
    if (toTile !== null) {
      const fromTile = computerSelectedTile
      selectTile(fromTile, toTile, black, callBack)
    }
  }

  const selectUserTile = (toTile: GameHelpers.Tile) => {
    const fromTile = userSelectedTile
    const callBack = (tile: GameHelpers.Tile) => {
      setUserSelectedTile(tile)
    }
    selectTile(fromTile, toTile, white, callBack)
  }

  const selectTile = (
    fromTile: GameHelpers.Tile | null,
    toTile: GameHelpers.Tile | null,
    side: Side,
    callBack: any
  ): void => {
    if (toTile === null) {
      return
    }

    const toPiece = GameHelpers.getPiece(board, toTile)
    const isSelectingAPiece = () => fromTile === null && toPiece.isPiece
    const isSwitchingSelection = () =>
      fromTile !== null && toPiece.side === side

    if (isSelectingAPiece() || isSwitchingSelection()) {
      callBack(toTile)
    } else if (fromTile !== null) {
      handleAttack(board, fromTile, toTile, side)
      callBack(null)
    }
  }

  const handleAttack = (
    board: GameHelpers.Board,
    fromTile: GameHelpers.Tile,
    toTile: GameHelpers.Tile,
    side: Side
  ): void => {
    const isMoveValid = GameHelpers.validMove(board, fromTile, toTile, side)
    if (isMoveValid) {
      movePiece(fromTile, toTile)
    }
  }

  const movePiece = (fromTile: GameHelpers.Tile, toTile: GameHelpers.Tile) => {
    const newBoard = GameHelpers.updateBoard(board, fromTile, toTile)
    setBoard(newBoard)
  }

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
