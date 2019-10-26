import React, { createContext, useContext, useState, useEffect } from "react"

import { GameHelpers } from "../../utils"
import { MinimaxAI } from "../../utils/ai"
import { Move, Side, black, white, Piece } from "../../utils/chess/chess"
import { Tile, Board } from "../../utils/game_helpers"
import ArcadeContext from "../../ArcadeContext"

export interface GameState {
  board: Board
  userSelectedTile: Tile | null
  computerSelectedTile: Tile | null
  countdownCount: number
  userLives: number
  computerLives: number
  resetBoard: () => void
  selectUserTile: (toTile: Tile) => void
}

export const initialGameState: GameState = {
  board: GameHelpers.initialBoard,
  userSelectedTile: null,
  computerSelectedTile: null,
  countdownCount: 3,
  userLives: 3,
  computerLives: 3,
  resetBoard: () => {},
  selectUserTile: () => {},
}

const ThreeKingsContext = createContext<GameState>(initialGameState)

const computerClockSpeed = 200

interface ThreeKingsProviderProps {
  children: JSX.Element
}

const ThreeKingsProvider = ({ children }: ThreeKingsProviderProps) => {
  const { setCurrentWinner } = useContext(ArcadeContext)

  const [board, setBoard] = useState<Board>(GameHelpers.initialBoard)
  const [userSelectedTile, setUserSelectedTile] = useState<Tile | null>(null)
  const [computerSelectedTile, setComputerSelectedTile] = useState<Tile | null>(
    null
  )
  const [computerCurrentMove, setComputerCurrentMove] = useState<Move | null>(
    null
  )
  const [gameStep, setGameStep] = useState<number>(0)
  const [gameIsActive, setGameIsActive] = useState<boolean>(false)
  const [countdownCount, setCountdownCount] = useState<number>(3)
  const [isActive, setIsActive] = useState<boolean>(true)
  const [userLives, setUserLives] = useState<number>(3)
  const [computerLives, setComputerLives] = useState<number>(3)

  const tick = (): void => {
    if (gameIsActive) {
      setGameStep(gameStep + 1)
      const winner: Side | null = calcWinner()
      if (winner == null) {
        const computerNextTile = getNextComputerTile()
        selectComputerTile(computerNextTile)
      } else {
        setGameIsActive(false)
        setCurrentWinner(winner)
      }
    }
  }

  const calcWinner = (): Side | null => {
    if (computerLives === 0) {
      return white
    } else if (userLives === 0) {
      return black
    } else {
      return null
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

  const getNextComputerTile = (): Tile | null => {
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

  const selectComputerTile = (toTile: Tile | null) => {
    const callBack = (tile: Tile) => {
      setComputerSelectedTile(tile)
    }
    if (toTile !== null) {
      const fromTile = computerSelectedTile
      selectTile(fromTile, toTile, black, callBack)
    }
  }

  const selectUserTile = (toTile: Tile) => {
    const fromTile = userSelectedTile
    const callBack = (tile: Tile) => {
      setUserSelectedTile(tile)
    }
    selectTile(fromTile, toTile, white, callBack)
  }

  const selectTile = (
    fromTile: Tile | null,
    toTile: Tile | null,
    side: Side,
    callBack: any
  ): void => {
    if (toTile === null) {
      throw new Error(`Player: ${side} tried to select a null for a tile`)
    }

    const toPiece: Piece = GameHelpers.getPiece(board, toTile)
    const isSelectingAPiece = () => fromTile === null && toPiece.isPiece
    const isSwitchingSelection = () =>
      fromTile !== null && toPiece.side === side

    if (isSelectingAPiece() || isSwitchingSelection()) {
      callBack(toTile)
    } else if (fromTile !== null) {
      handleAttack(board, fromTile, toTile, side, toPiece)
      callBack(null)
    }
  }

  const handleAttack = (
    board: Board,
    fromTile: Tile,
    toTile: Tile,
    side: Side,
    toPiece: Piece
  ): void => {
    const isMoveValid = GameHelpers.validMove(board, fromTile, toTile, side)
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

  const removePiece = (tile: Tile) => {
    const newBoard = GameHelpers.removePiece(board, tile)
    setBoard(newBoard)
  }

  const movePiece = (fromTile: Tile, toTile: Tile) => {
    const newBoard = GameHelpers.updateBoard(board, fromTile, toTile)
    setBoard(newBoard)
  }

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
