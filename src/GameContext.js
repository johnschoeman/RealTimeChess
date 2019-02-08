import React from 'react'

const { Provider, Consumer } = React.createContext()

class GameProvider extends React.Component {
  state = { count: 1 }

  incrementCount = () => {
    const { count } = this.state

    this.setState({ count: count + 1 })
  }

  resetState = () => {
    this.setState({ count: 0 })
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          incrementCount: this.incrementCount,
          resetState: this.resetState,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export { GameProvider, Consumer as GameConsumer }
