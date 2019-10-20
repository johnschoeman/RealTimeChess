import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"

import { GameHelpers } from "../utils"
import { MinimaxAI } from "../utils/ai"
import { Side } from "../utils/game_helpers"
import { Move } from "../utils/chess/chess"

export interface GameState {
  board: GameHelpers.Board
  userSelectedTile: GameHelpers.Tile | null
  computerSelectedTile: GameHelpers.Tile | null
  winner: GameHelpers.Side | null
  resetBoard: () => void
  selectUserTile: (toTile: GameHelpers.Tile) => void
  setGameIsActive: Dispatch<SetStateAction<boolean>>
}

export const initialGameState: GameState = {
  board: GameHelpers.initialBoard,
  userSelectedTile: null,
  computerSelectedTile: null,
  winner: null,
  resetBoard: () => {},
  selectUserTile: () => {},
  setGameIsActive: () => {},
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
  const [computerCurrentMove, setComputerCurrentMove] = useState<Move | null>(
    null
  )
  const [winner, setWinner] = useState<GameHelpers.Side | null>(null)
  const [gameStep, setGameStep] = useState<number>(0)
  const [gameIsActive, setGameIsActive] = useState<boolean>(false)

  const tick = (): void => {
    if (gameIsActive) {
      setGameStep(gameStep + 1)
      const currentWinner: Side | null = GameHelpers.winner(board)
      if (currentWinner == null) {
        const computerNextTile = getNextComputerTile()
        selectComputerTile(computerNextTile)
      } else {
        setGameIsActive(false)
        setWinner(currentWinner)
      }
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
      const move = MinimaxAI.selectMove(board, "black")
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
      return
    }

    const toPiece = GameHelpers.getPiece(board, toTile)
    if (fromTile === null && toPiece.isPiece) {
      callBack(toTile)
    } else if (fromTile !== null) {
      const isMoveValid = GameHelpers.validMove(board, fromTile, toTile, side)

      if (isMoveValid) {
        movePiece(fromTile, toTile)
        callBack(null)
      } else {
        if (GameHelpers.getPiece(board, toTile).side === side) {
          callBack(toTile)
        }
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
        setGameIsActive,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export { GameProvider }
export default GameContext
