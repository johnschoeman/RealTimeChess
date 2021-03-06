import React, { useContext } from "react"
import { View, Text } from "react-native"
import { render, cleanup, wait } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import CooldownContext, { CooldownProvider } from "./CooldownContext"
import ArcadeContext, { ArcadeProvider } from "../../ArcadeContext"
import { GameHelpers } from "../../utils"

afterEach(cleanup)

const renderGameProvider = () => {
  const TestGameConsumer = () => {
    const { userSelectedTile, board } = useContext(CooldownContext)
    const { setComputerClockSpeed, setGameIsActive } = useContext(ArcadeContext)
    setComputerClockSpeed(1)
    setGameIsActive(true)
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
    <ArcadeProvider>
      <CooldownProvider>
        <TestGameConsumer />
      </CooldownProvider>
    </ArcadeProvider>
  )
}

const initialBoardAscii = boardToText(GameHelpers.createBoard())

describe("CooldownProvider", () => {
  describe("After a few seconds", () => {
    test("the computer has made some moves", async () => {
      const { getByTestId } = renderGameProvider()

      const currentBoardAscii = getByTestId("board")

      await wait(
        () => {
          expect(currentBoardAscii).not.toHaveTextContent(initialBoardAscii)
        },
        { timeout: 4900 }
      )
    })
  })
})

function boardToText(board: GameHelpers.Board): string {
  return GameHelpers.boardToAscii(board).replace(/(\n)/gm, " ")
}
