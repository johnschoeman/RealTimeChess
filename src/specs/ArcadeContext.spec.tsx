import React, { useContext } from "react"
import { View, Text } from "react-native"
import { render, cleanup, wait } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import ArcadeContext, { ArcadeProvider } from "../ArcadeContext"

afterEach(cleanup)

const renderArcadeProvider = () => {
  const TestArcadeConsumer = () => {
    const { currentGame } = useContext(ArcadeContext)
    return (
      <View>
        <Text testID={"current-game"}>{currentGame}</Text>
      </View>
    )
  }

  return render(
    <ArcadeProvider>
      <TestArcadeConsumer />
    </ArcadeProvider>
  )
}

describe("ArcadeProvider", () => {
  test("The provider component provides the context to a consumer", () => {
    const { getByTestId } = renderArcadeProvider()

    expect(getByTestId("current-game")).toHaveTextContent("")
  })
})
