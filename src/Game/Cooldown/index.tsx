import React, { useContext } from "react"

import Board from "../Board"
import CooldownContext, { CooldownProvider } from "./CooldownContext"
import GameContainer from "../GameContainer"

const CooldownGame = () => {
  const {
    board,
    countdownCount,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
  } = useContext(CooldownContext)
  return (
    <Board
      board={board}
      countdownCount={countdownCount}
      userSelectedTile={userSelectedTile}
      computerSelectedTile={computerSelectedTile}
      selectUserTile={selectUserTile}
    />
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
