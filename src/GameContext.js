import React from 'react'

import { GameHelpers } from './utils'

const { Provider, Consumer } = React.createContext()

class GameProvider extends React.Component {
  state = { board: GameHelpers.initialBoard }

  resetBoard = () => {
    this.setState({ board: GameHelpers.initialBoard })
  }

  movePiece = (from_y, from_x, to_y, to_x) => {
    const { board } = this.state
    const newBoard = GameHelpers.updateBoard(board, from_x, from_y, to_x, to_y)
    this.setState({ board: newBoard })
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          movePiece: this.movePiece,
          resetBoard: this.resetBoard,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { GameProvider, Consumer as GameConsumer }
