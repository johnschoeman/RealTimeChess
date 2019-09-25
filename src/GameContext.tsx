import React from "react"

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

const { Provider, Consumer } = React.createContext<GameState>(initialGameState)

const computerClockSpeed = 500

class GameProvider extends React.Component {
  state = {
    board: GameHelpers.initialBoard,
    userSelectedTile: null,
    computerSelectedTile: null,
  }
  interval = 0

  componentDidMount() {
    this.startGame()
  }

  startGame = () => {
    this.interval = setInterval(this.tick, computerClockSpeed)
  }

  tick = () => {
    const computerNextTile = this.getNextComputerTile()
    this.selectComputerTile(computerNextTile)
  }

  getNextComputerTile = (): Tile | null => {
    const { board, computerSelectedTile } = this.state
    if (computerSelectedTile) {
      const move = this.getRandomMove(board, computerSelectedTile)
      return move
    } else {
      const tile = this.getRandomPieceTile("black")
      return tile
    }
  }

  getRandomMove = (board: Piece[][], tile: Tile): Tile | null => {
    const piece = GameHelpers.getPiece(board, tile)
    const validMoves = GameHelpers.validMoves(piece, tile)
    return GameHelpers.sample<Tile>(validMoves)
  }

  getRandomPieceTile = (color: string): Tile | null => {
    const { board } = this.state
    const tiles: Array<Tile> = GameHelpers.playerPieces(board, color).map(
      piece => piece.tile
    )
    return GameHelpers.sample(tiles)
  }

  resetBoard = () => {
    this.setState({ board: GameHelpers.initialBoard })
  }

  selectComputerTile = (toTile: Tile | null) => {
    const callBack = (tile: Tile) => {
      this.setState({ computerSelectedTile: tile })
    }
    if (toTile !== null) {
      const { computerSelectedTile: fromTile } = this.state
      this.selectTile(fromTile, toTile, callBack)
    }
  }

  selectUserTile = (toTile: Tile) => {
    const { userSelectedTile: fromTile } = this.state
    const callBack = (tile: Tile) => {
      this.setState({ userSelectedTile: tile })
    }
    this.selectTile(fromTile, toTile, callBack)
  }

  selectTile = (fromTile: Tile | null, toTile: Tile | null, callBack: any) => {
    const { board } = this.state
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
        this.movePiece(fromTile, toTile)
        callBack(null)
      }
    }
  }

  movePiece = (fromTile: Tile, toTile: Tile) => {
    const { board } = this.state
    const newBoard = GameHelpers.updateBoard(board, fromTile, toTile)
    this.setState({ board: newBoard })
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          resetBoard: this.resetBoard,
          selectUserTile: this.selectUserTile,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { GameProvider, Consumer as GameConsumer }
