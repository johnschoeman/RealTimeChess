import { useState, useEffect, useContext } from "react"

import ArcadeContext from "../ArcadeContext"
import { MaximizingAI } from "../utils/ai"
import { GameHelpers } from "../utils"
import { Board, Tile } from "../utils/game_helpers"
import { Move, Side, black, white } from "../utils/chess/chess"

export interface GameState {
  board: Board
  userSelectedTile: Tile | null
  computerSelectedTile: Tile | null
  countdownCount: number
  resetBoard: () => void
  selectUserTile: (toTile: Tile) => void
}

const useCountDown = (count: number, callback: () => void) => {
  const [countdownCount, setCountdownCount] = useState<number>(count)
  const [isActive, setIsActive] = useState<boolean>(true)

  useEffect(() => {
    let intervalId: number = 0
    if (isActive) {
      intervalId = setInterval(() => {
        setCountdownCount((countdownCount: number) => countdownCount - 1)
      }, 1000)
      if (countdownCount < 0) {
        setIsActive(false)
        clearInterval(intervalId)
        callback()
      }
    }
    return () => clearInterval(intervalId)
  }, [isActive, countdownCount])

  return { countdownCount }
}

export const useGameState = (
  handleAttack: (
    board: Board,
    fromTile: Tile,
    toTile: Tile,
    side: Side
  ) => void,
  decrementCooldowns: () => void = () => {}
) => {
  const computerClockSpeed = 200
  const { setCurrentWinner, currentGame } = useContext(ArcadeContext)
  const [board, setBoard] = useState<Board>(GameHelpers.createBoard())
  const [userSelectedTile, setUserSelectedTile] = useState<Tile | null>(null)
  const [computerSelectedTile, setComputerSelectedTile] = useState<Tile | null>(
    null
  )
  const [computerCurrentMove, setComputerCurrentMove] = useState<Move | null>(
    null
  )
  const [gameStep, setGameStep] = useState<number>(0)
  const [gameIsActive, setGameIsActive] = useState<boolean>(false)

  const { countdownCount } = useCountDown(3, () => setGameIsActive(true))

  const tick = (): void => {
    if (gameIsActive) {
      setGameStep(gameStep + 1)
      const winner = GameHelpers.winner(board)
      decrementCooldowns()
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
    const intervalID = setInterval(tick, computerClockSpeed)
    return () => {
      clearInterval(intervalID)
    }
  })

  const getNextComputerTile = (): Tile | null => {
    if (computerCurrentMove == null) {
      const move = MaximizingAI.selectMove(board, black)
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
      return
    }

    const toPiece = GameHelpers.getPiece(board, toTile)
    const isSelectingAPiece = () => fromTile === null && toPiece.isPiece
    const isSwitchingSelection = () =>
      fromTile !== null && toPiece.side === side

    if (isSelectingAPiece() || isSwitchingSelection()) {
      callBack(toTile)
    } else if (fromTile !== null) {
      try {
        handleAttack(board, fromTile, toTile, side)
      } catch (error) {
        console.log(
          "Error when trying to attack: ",
          error,
          currentGame,
          board,
          fromTile,
          toTile,
          side
        )
      } finally {
        callBack(null)
      }
    }
  }

  const resetBoard = () => {
    setBoard(GameHelpers.createBoard())
    setComputerCurrentMove(null)
    setComputerSelectedTile(null)
    setUserSelectedTile(null)
    setGameStep(0)
  }

  return {
    board,
    setBoard,
    userSelectedTile,
    computerSelectedTile,
    countdownCount,
    selectUserTile,
    resetBoard,
  }
}
