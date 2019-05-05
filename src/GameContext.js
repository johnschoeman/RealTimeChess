import React from 'react'

import { GameHelpers, NullPiece } from './utils'

const { Provider, Consumer } = React.createContext()

const computerClockSpeed = 500

class GameProvider extends React.Component {
  state = {
    board: GameHelpers.initialBoard,
    userSelectedTile: { rowIdx: null, colIdx: null },
    computerSelectedTile: { rowIdx: null, colIdx: null },
  }

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

  getNextComputerTile = () => {
    const { board, computerSelectedTile } = this.state
    let nextTile
    if (computerSelectedTile.rowIdx === null) {
      nextTile = this.getRandomPieceTile("black")
    } else {
      const move = this.getRandomMove(board, computerSelectedTile)
      if (move === null) {
        nextTile = { rowIdx: null, colIdx: null }
      } else {
        nextTile = move
      }
    }
    return nextTile
  }

  getRandomMove = (board, tile) => {
    const piece = GameHelpers.getPiece(board, tile)
    const validMoves = GameHelpers.validMoves(piece, tile)
    return GameHelpers.sample(validMoves)
  }

  getRandomPieceTile = (color) => {
    const { board } = this.state
    const tiles = GameHelpers.playerPieces(board, color).
      map((piece) => piece.tile)
    return GameHelpers.sample(tiles)
  }

  resetBoard = () => {
    this.setState({ board: GameHelpers.initialBoard })
  }

  selectComputerTile = toTile => {
    const { computerSelectedTile: fromTile } = this.state
    const callBack = tile => {
      this.setState({ computerSelectedTile: tile })
    }
    this.selectTile(fromTile, toTile, callBack)
  }

  selectUserTile = toTile => {
    const { userSelectedTile: fromTile } = this.state
    const callBack = tile => {
      this.setState({ userSelectedTile: tile })
    }
    this.selectTile(fromTile, toTile, callBack)
  }

  selectTile = (fromTile, toTile, callBack) => {
    const { board } = this.state
    const { rowIdx: fromRow, colIdx: fromCol } = fromTile
    const { rowIdx: toRow, colIdx: toCol } = toTile

    if (toRow === null && toCol === null) {
      callBack({ rowIdx: null, colIdx: null})
      return
    }

    const toPiece = board[toRow][toCol]

    if (fromRow === toRow && fromCol == toCol) {
      callBack({ rowIdx: null, colIdx: null })
    } else if (fromRow === null && fromCol === null) {
      if (toPiece.isPiece) {
        callBack({ rowIdx: toRow, colIdx: toCol })
      }
    } else {
      if (GameHelpers.validMove(board, fromTile, toTile)) {
        this.movePiece(fromTile, toTile)
        callBack({ rowIdx: null, colIdx: null })
      }
    }
  }

  movePiece = (fromTile, toTile) => {
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
