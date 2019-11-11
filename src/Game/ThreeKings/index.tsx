import React, { useContext } from "react"
import { View } from "react-native"

import Board from "../Board"
import Hearts from "./Hearts"
import GameContainer from "../GameContainer"
import Countdown from "../Countdown"
import ThreeKingsContext, { ThreeKingsProvider } from "./ThreeKingsContext"

const ThreeKingsGame = () => {
  const {
    board,
    countdownCount,
    userSelectedTile,
    computerSelectedTile,
    userLives,
    computerLives,
    selectUserTile,
  } = useContext(ThreeKingsContext)
  return (
    <View>
      {countdownCount >= 0 ? <Countdown count={countdownCount} /> : null}
      <Hearts livesCount={computerLives} />
      <Board
        board={board}
        userSelectedTile={userSelectedTile}
        computerSelectedTile={computerSelectedTile}
        selectUserTile={selectUserTile}
      />
      <Hearts livesCount={userLives} />
    </View>
  )
}

const ThreeKings = () => {
  return (
    <ThreeKingsProvider>
      <GameContainer title={"ThreeKings"}>
        <ThreeKingsGame />
      </GameContainer>
    </ThreeKingsProvider>
  )
}

export default ThreeKings
