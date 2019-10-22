import React, { useContext } from "react"
import { View, Text } from "react-native"
import { render, cleanup, wait } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import ThreeKingsContext, {
  ThreeKingsProvider,
} from "../../../Game/ThreeKings/ThreeKingsContext"
import { GameHelpers } from "../../../utils"

afterEach(cleanup)

const renderGameProvider = () => {
  const TestGameConsumer = () => {
    const { userSelectedTile, board } = useContext(ThreeKingsContext)
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
    <ThreeKingsProvider>
      <TestGameConsumer />
    </ThreeKingsProvider>
  )
}

const initialBoardAscii = boardToText(GameHelpers.initialBoard)

describe("ThreeKingsProvider", () => {
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
