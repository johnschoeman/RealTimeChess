import React, { useContext } from "react"
import { View } from "react-native"

import Board from "../Board"
import GameContainer from "../GameContainer"
import PlaygroundContext, { PlaygroundProvider } from "./PlaygroundContext"

const PlaygroundGame = () => {
  const {
    board,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
  } = useContext(PlaygroundContext)

  return (
    <View>
      <Board
        board={board}
        userSelectedTile={userSelectedTile}
        computerSelectedTile={computerSelectedTile}
        selectUserTile={selectUserTile}
      />
    </View>
  )
}

const ThreeKings = () => {
  return (
    <PlaygroundProvider>
      <GameContainer title={"Playground"}>
        <PlaygroundGame />
      </GameContainer>
    </PlaygroundProvider>
  )
}

export default ThreeKings
