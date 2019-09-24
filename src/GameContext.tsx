import React from "react"

import { GameHelpers } from "./utils"
import { Piece } from "./utils/pieces"
import { Tile } from "./utils/game_helpers"

interface GameState {
  board: GameHelpers.Board
  userSelectedTile: { rowIdx: number | undefined; colIdx: number | undefined }
  computerSelectedTile: {
    rowIdx: number | undefined
    colIdx: number | undefined
  }
  resetBoard: any
  selectUserTile: any
}

const initialGameState: GameState = {
  board: GameHelpers.initialBoard,
  userSelectedTile: { rowIdx: undefined, colIdx: undefined },
  computerSelectedTile: { rowIdx: undefined, colIdx: undefined },
  resetBoard: () => {},
  selectUserTile: () => {},
}

const { Provider, Consumer } = React.createContext<GameState>(initialGameState)

const computerClockSpeed = 500

class GameProvider extends React.Component {
  state = {
    board: GameHelpers.initialBoard,
    userSelectedTile: { rowIdx: undefined, colIdx: undefined },
    computerSelectedTile: { rowIdx: undefined, colIdx: undefined },
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
    let nextTile: Tile | null
    if (computerSelectedTile.rowIdx === undefined) {
      nextTile = this.getRandomPieceTile("black")
    } else {
      const move = this.getRandomMove(board, computerSelectedTile)
      if (move === undefined) {
        nextTile = { rowIdx: undefined, colIdx: undefined }
      } else {
        nextTile = move
      }
    }
    return nextTile
  }

  getRandomMove = (board: Piece[][], tile: Tile) => {
    const piece = GameHelpers.getPiece(board, tile)
    const validMoves = GameHelpers.validMoves(piece, tile)
    return GameHelpers.sample(validMoves)
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
    if (toTile !== null) {
      const { computerSelectedTile: fromTile } = this.state
      const callBack = (tile: Tile) => {
        this.setState({ computerSelectedTile: tile })
      }
      this.selectTile(fromTile, toTile, callBack)
    } else {
      console.error("Tried to select null tile")
    }
  }

  selectUserTile = (toTile: Tile) => {
    const { userSelectedTile: fromTile } = this.state
    const callBack = (tile: Tile) => {
      this.setState({ userSelectedTile: tile })
    }
    this.selectTile(fromTile, toTile, callBack)
  }

  selectTile = (fromTile: Tile, toTile: Tile, callBack: any) => {
    const { board } = this.state
    const { rowIdx: fromRow, colIdx: fromCol } = fromTile
    const { rowIdx: toRow, colIdx: toCol } = toTile

    if (toRow === undefined || toCol === undefined) {
      callBack({ rowIdx: undefined, colIdx: undefined })
      return
    }

    const toPiece = board[toRow][toCol]

    if (fromRow === toRow && fromCol === toCol) {
      callBack({ rowIdx: undefined, colIdx: undefined })
    } else if (fromRow === undefined && fromCol === undefined) {
      if (toPiece.isPiece) {
        callBack({ rowIdx: toRow, colIdx: toCol })
      }
    } else {
      if (GameHelpers.validMove(board, fromTile, toTile)) {
        this.movePiece(fromTile, toTile)
        callBack({ rowIdx: undefined, colIdx: undefined })
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
