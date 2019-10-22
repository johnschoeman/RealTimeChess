import React from "react"
import { render, cleanup } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import GameScreen from "../../Game"

afterEach(cleanup)

describe("Game", () => {
  test("it renders with default game state", () => {
    const { getByTestId } = render(<GameScreen />)

    expect(getByTestId("game")).toBeDefined()
  })
})
