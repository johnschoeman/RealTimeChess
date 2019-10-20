import React, { useContext } from "react"
import { View, Text } from "react-native"
import { render, cleanup, wait } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import GameContext, { GameProvider } from "../../Game/GameContext"
import { GameHelpers } from "../../utils"

afterEach(cleanup)

const renderGameProvider = () => {
  const TestGameConsumer = () => {
    const { userSelectedTile, board } = useContext(GameContext)
    return (
      <View>
        <Text testID={"user-selected-tile"}>
          {userSelectedTile || "no selection"}
        </Text>
        <Text testID={"board"}>{GameHelpers.boardToAscii(board)}</Text>
      </View>
    )
  }

  return render(
    <GameProvider>
      <TestGameConsumer />
    </GameProvider>
  )
}

const initialBoardAscii = boardToText(GameHelpers.initialBoard)

describe("GameProvider", () => {
  test("The GameScreen component provides the game context", () => {
    const { getByTestId } = renderGameProvider()

    expect(getByTestId("user-selected-tile")).toHaveTextContent("no selection")
    expect(getByTestId("board")).toHaveTextContent(initialBoardAscii)
  })

  describe("After a few seconds", () => {
    test("the computer has made some moves", async () => {
      const { getByTestId } = renderGameProvider()

      const currentBoard = getByTestId("board")

      wait(
        () => {
          expect(currentBoard).not.toHaveTextContent(initialBoardAscii)
        },
        { timeout: 5000 }
      )
    })
  })
})

function boardToText(board: GameHelpers.Board): string {
  return GameHelpers.boardToAscii(board).replace(/(\n)/gm, " ")
}
