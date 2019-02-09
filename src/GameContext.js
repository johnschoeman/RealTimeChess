import React from 'react'

import { GameHelpers } from './utils'

const { Provider, Consumer } = React.createContext()

class GameProvider extends React.Component {
  state = {
    board: GameHelpers.initialBoard,
    userSelection: { rowIdx: null, colIdx: null },
  }

  resetBoard = () => {
    this.setState({ board: GameHelpers.initialBoard })
  }

  selectTile = (toRow, toCol) => {
    const { userSelection: { rowIdx: fromRow, colIdx: fromCol } } = this.state

    if (fromRow === toRow && fromCol == toCol) {
      this.setState({ userSelection: { rowIdx: null, colIdx: null}})
    } else if (fromRow === null && fromCol === null) {
      this.setState({ userSelection: { rowIdx: toRow, colIdx: toCol }})
    } else {
      this.movePiece(fromRow, fromCol, toRow, toCol)
      this.setState({ userSelection: { rowIdx: null, colIdx: null} })
    }
  }

  movePiece = (fromRow, fromCol, toRow, toCol) => {
    const { board } = this.state
    const newBoard = GameHelpers.updateBoard(board, fromRow, fromCol, toRow, toCol)
    this.setState({ board: newBoard })
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          resetBoard: this.resetBoard,
          selectTile: this.selectTile,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { GameProvider, Consumer as GameConsumer }
