import React from "react"
import { render, cleanup } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import GameOver from "."

afterEach(cleanup)

describe("GameOverScreen", () => {
  test("it renders", () => {
    const { getByTestId } = render(<GameOver />)

    expect(getByTestId("game-over")).toBeDefined()
  })
})
