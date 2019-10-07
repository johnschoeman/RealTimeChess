import React from "react"
import { render, cleanup } from "@testing-library/react-native"

import GameScreen from "../../Game"

afterEach(cleanup)

describe("GameScreen", () => {
  test("it renders", () => {
    const { getByTestId } = render(<GameScreen />)

    expect(getByTestId("game-screen")).toBeDefined()
  })
})
