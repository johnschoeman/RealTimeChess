import React, { createContext, useState, useEffect } from "react"

import { GameHelpers } from "./utils"
import { Piece } from "./utils/pieces"
import { Tile } from "./utils/game_helpers"

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

const computerClockSpeed = 500

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
    if (computerSelectedTile) {
      const move = getRandomMove(board, computerSelectedTile)
      return move
    } else {
      const tile = getRandomPieceTile("black")
      return tile
    }
  }

  const getRandomMove = (board: Piece[][], tile: Tile): Tile | null => {
    const piece = GameHelpers.getPiece(board, tile)
    const validMoves = GameHelpers.validMoves(piece, tile)
    return GameHelpers.sample<Tile>(validMoves)
  }

  const getRandomPieceTile = (color: string): Tile | null => {
    const tiles: Array<Tile> = GameHelpers.playerPieces(board, color).map(
      piece => piece.tile
    )
    return GameHelpers.sample(tiles)
  }

  const resetBoard = () => {
    setBoard(GameHelpers.initialBoard)
  }

  const selectComputerTile = (toTile: Tile | null) => {
    const callBack = (tile: Tile) => {
      setComputerSelectedTile(tile)
    }
    if (toTile !== null) {
      const fromTile = computerSelectedTile
      selectTile(fromTile, toTile, callBack)
    }
  }

  const selectUserTile = (toTile: Tile) => {
    const fromTile = userSelectedTile
    const callBack = (tile: Tile) => {
      setUserSelectedTile(tile)
    }
    selectTile(fromTile, toTile, callBack)
  }

  const selectTile = (
    fromTile: Tile | null,
    toTile: Tile | null,
    callBack: any
  ) => {
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
      if (GameHelpers.validMove(board, fromTile, toTile)) {
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
