import React, { useContext } from "react"
import { View } from "react-native"

import Board from "../Board"
import Countdown from "../Countdown"
import GameContainer from "../GameContainer"
import CooldownContext, { CooldownProvider } from "./CooldownContext"

const CooldownGame = () => {
  const {
    board,
    countdownCount,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
  } = useContext(CooldownContext)
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

const Cooldown = () => {
  return (
    <CooldownProvider>
      <GameContainer title={"Cooldown"}>
        <CooldownGame />
      </GameContainer>
    </CooldownProvider>
  )
}

export default Cooldown
