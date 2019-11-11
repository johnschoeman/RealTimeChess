import React, { useContext } from "react"
import { View } from "react-native"

import Board from "../Board"
import GameContainer from "../GameContainer"
import Countdown from "../Countdown"
import ClassicContext, { ClassicProvider } from "./ClassicContext"

const ClassicGame = () => {
  const {
    board,
    countdownCount,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
  } = useContext(ClassicContext)
  return (
    <View>
      {countdownCount >= 0 ? <Countdown count={countdownCount} /> : null}
      <Board
        board={board}
        userSelectedTile={userSelectedTile}
        computerSelectedTile={computerSelectedTile}
        selectUserTile={selectUserTile}
      />
    </View>
  )
}

const Classic = () => {
  return (
    <ClassicProvider>
      <GameContainer title={"Classic"}>
        <ClassicGame />
      </GameContainer>
    </ClassicProvider>
  )
}

export default Classic
