import { useState, useEffect, useContext } from "react"

import ArcadeContext from "../ArcadeContext"
import { MaximizingAI } from "../utils/ai"
import { GameHelpers } from "../utils"
import { Board, Tile, boardToAscii } from "../utils/game_helpers"
import { Move, Side, black, white } from "../utils/chess/chess"

export interface GameState {
  board: Board
  moveQueue: MoveAttempt[]
  userSelectedTile: Tile | null
  computerSelectedTile: Tile | null
  resetBoard: () => void
  selectUserTile: (toTile: Tile) => void
}

export const initialGameState: GameState = {
  board: GameHelpers.createBoard(),
  moveQueue: [],
  userSelectedTile: null,
  computerSelectedTile: null,
  resetBoard: () => {},
  selectUserTile: () => {},
}

export interface GameStateWithCountdown extends GameState {
  countdownCount: number
}

export const initialGameStateWithCountdown: GameStateWithCountdown = {
  ...initialGameState,
  countdownCount: 3,
}

export const useCountDown = (initialCount: number, callback: () => void) => {
  const [countdownCount, setCountdownCount] = useState<number>(initialCount)
  const [isActive, setIsActive] = useState<boolean>(true)

  useEffect(() => {
    let intervalId: number = 0
    if (isActive) {
      intervalId = setInterval(() => {
        setCountdownCount((count: number) => count - 1)
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

interface MechanicOptions {
  handleAttack: (board: Board, fromTile: Tile, toTile: Tile, side: Side) => void
  decrementCooldowns?: () => void
  tick?: () => void
}

export interface MoveAttempt {
  fromTile: Tile
  toTile: Tile
  side: Side
  expireTime: number
}

export const useGameState = ({
  handleAttack,
  decrementCooldowns,
  tick,
}: MechanicOptions) => {
  const {
    setCurrentWinner,
    currentGame,
    computerClockSpeed,
    gameIsActive,
    setGameIsActive,
  } = useContext(ArcadeContext)
  const [board, setBoard] = useState<Board>(GameHelpers.createBoard())
  const [moveQueue, setMoveQueue] = useState<MoveAttempt[]>([])
  const [userSelectedTile, setUserSelectedTile] = useState<Tile | null>(null)
  const [computerSelectedTile, setComputerSelectedTile] = useState<Tile | null>(
    null
  )
  const [computerCurrentMove, setComputerCurrentMove] = useState<Move | null>(
    null
  )
  const [gameStep, setGameStep] = useState<number>(0)

  const defaultTick = (): void => {
    if (gameIsActive) {
      if (decrementCooldowns) {
        decrementCooldowns()
      }
      // manageMoveQueue()
      const winner = GameHelpers.winner(board)
      if (winner == null) {
        const computerNextTile = getNextComputerTile()
        selectComputerTile(computerNextTile)
      } else {
        setGameIsActive(false)
        setCurrentWinner(winner)
      }
    }
  }

  // const manageMoveQueue = () => {
  //   const nextQueue = [...moveQueue]
  //   nextQueue.map((move) => {
  //     const { timeRemaining } = move
  //     move.timeRemaining = timeRemaining - computerClockSpeed
  //   })
  // }

  useEffect(() => {
    const onTick = tick ? tick : defaultTick
    const intervalID = setInterval(onTick, computerClockSpeed)
    return () => {
      clearInterval(intervalID)
    }
  })

  const fastTick = () => {
    if (gameIsActive) {
      setGameStep(gameStep + 1)
      manageMoveQueue()
    }
  }

  useEffect(() => {
    const intervalID = setInterval(fastTick, 1)
    return () => {
      clearInterval(intervalID)
    }
  })

  const manageMoveQueue = () => {
    const now = Date.now()
    const newMoves = [...moveQueue].map((move) => {
      const {expireTime} = move
      if (expireTime < now) {
        const { fromTile, toTile, side} = move
        attemptMove(fromTile, toTile, side)
        return null
      } else {
        return {...move }
      }
    }).filter((move) => move !== null)
    setMoveQueue(newMoves)
  }

  const attemptMove = (fromTile: Tile, toTile: Tile, side: Side) => {
    // const isMoveValid = GameHelpers.validMove(board, fromTile, toTile, side)
    // if (isMoveValid) {
      const newBoard = GameHelpers.updateBoard(board, fromTile, toTile)
      setBoard(newBoard)
    // }
  }

  const queueMove = (fromTile: Tile, toTile: Tile, side: Side, moveDuration: number) => {
    const now = Date.now()
    const expireTime = now + moveDuration
    setMoveQueue([...moveQueue, {fromTile, toTile, side, expireTime}])
  }

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
    const isSwitchingSelection = () => {
      if (fromTile === null) {
        return false
      } else {
        const fromPiece = GameHelpers.getPiece(board, fromTile)
        return toPiece.side === fromPiece.side
      }
    }

    if (isSelectingAPiece() || isSwitchingSelection()) {
      if (toPiece.side === side) {
        callBack(toTile)
      }
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
    selectUserTile,
    resetBoard,
    setGameIsActive,
    moveQueue,
    queueMove,
  }
}
