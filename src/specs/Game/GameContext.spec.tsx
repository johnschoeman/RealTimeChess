import React, { useContext } from "react"
import { View, Text } from "react-native"
import { render, cleanup } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import GameContext, { GameProvider } from "../../Game/GameContext"

afterEach(cleanup)

const renderGameProvider = () => {
  const TestGameConsumer = () => {
    const { userSelectedTile } = useContext(GameContext)
    return (
      <View>
        <Text testID={"user-selected-tile"}>
          {userSelectedTile || "no selection"}
        </Text>
      </View>
    )
  }

  return render(
    <GameProvider>
      <TestGameConsumer />
    </GameProvider>
  )
}

describe("GameProvider", () => {
  test("The GameScreen component provides the game context", () => {
    const { getByTestId } = renderGameProvider()

    expect(getByTestId("user-selected-tile")).toHaveTextContent("no selection")
  })
})
