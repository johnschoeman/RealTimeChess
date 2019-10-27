import React, { useContext } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { render, cleanup, wait, fireEvent } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import ClassicContext, { ClassicProvider } from "./ClassicContext"
import { GameHelpers } from "../../utils"

afterEach(cleanup)

const renderGameProvider = () => {
  const TestGameConsumer = () => {
    const { userSelectedTile, board, selectUserTile } = useContext(
      ClassicContext
    )
    return (
      <View>
        <Text testID={"user-selected-tile"}>
          {userSelectedTile ? tileToText(userSelectedTile) : "no selection"}
        </Text>
        <Text testID={"board"}>{GameHelpers.boardToAscii(board)}</Text>
        <TouchableOpacity
          onPress={() => selectUserTile({ rowIdx: 6, colIdx: 4 })}
        >
          <Text testID={"e2"}>E2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectUserTile({ rowIdx: 4, colIdx: 4 })}
        >
          <Text testID={"e4"}>E4</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return render(
    <ClassicProvider>
      <TestGameConsumer />
    </ClassicProvider>
  )
}

const initialBoardAscii = boardToText(GameHelpers.initialBoard)

describe("ClassicProvider", () => {
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

  describe("As a human", () => {
    test("I can move e2 to e4", async () => {
      const expectedBoard = GameHelpers.createBoard(
        "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1"
      )
      const expectedBoardAscii = boardToText(expectedBoard)

      const { getByTestId } = renderGameProvider()

      const e2 = getByTestId("e2")
      const e4 = getByTestId("e4")

      fireEvent.press(e2)
      await wait(() => {
        const currentUserSelection = getByTestId("user-selected-tile")
        expect(currentUserSelection).toHaveTextContent("e2")
      })
      fireEvent.press(e4)
      await wait(() => {
        const currentBoardAscii = getByTestId("board")
        expect(currentBoardAscii).toHaveTextContent(expectedBoardAscii)
      })
    })
  })
})

function boardToText(board: GameHelpers.Board): string {
  return GameHelpers.boardToAscii(board).replace(/(\n)/gm, " ")
}

function tileToText(tile: GameHelpers.Tile): string {
  return GameHelpers.tileRCtoAN(tile).square
}
