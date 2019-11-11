import React, { useContext } from "react"

import Board from "../Board"
import ClassicContext, { ClassicProvider } from "./ClassicContext"
import GameContainer from "../GameContainer"

const ClassicGame = () => {
  const {
    board,
    countdownCount,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
  } = useContext(ClassicContext)
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
