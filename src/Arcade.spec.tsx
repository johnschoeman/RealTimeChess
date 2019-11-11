import React from "react"
import { render, cleanup, wait } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import ArcadeContext, {
  ArcadeState,
  initialArcadeState,
  Games,
  Screens,
} from "./ArcadeContext"
import ArcadeScreen from "./Arcade"

afterEach(cleanup)

const renderGameScreen = (value: ArcadeState) => {
  return render(
    <ArcadeContext.Provider value={value}>
      <ArcadeScreen />
    </ArcadeContext.Provider>
  )
}

describe("Aracade", () => {
  test("it renders with default game state", () => {
    const { getByTestId } = renderGameScreen(initialArcadeState)

    expect(getByTestId("arcade")).toBeDefined()
  })

  describe("when the game is over", () => {
    describe("and when black has won the game", () => {
      test("a 'You Lose' message is visable", async () => {
        const arcadeState: ArcadeState = {
          currentGame: Games.Classic,
          currentWinner: "b",
          computerClockSpeed: 200,
          gameIsActive: true,
          currentScreen: Screens.Game,
          setCurrentGame: () => {},
          setCurrentWinner: () => {},
          setComputerClockSpeed: () => {},
          setGameIsActive: () => {},
          setCurrentScreen: () => {},
        }
        const { queryByTestId } = renderGameScreen(arcadeState)

        await wait()

        expect(queryByTestId("game-over-lose")).not.toBe(null)
        expect(queryByTestId("game-over-win")).toBe(null)
      })
    })

    describe("and when white has won the game", () => {
      test("a 'You Won' message is visable", async () => {
        const arcadeState: ArcadeState = {
          currentGame: Games.Classic,
          currentWinner: "w",
          computerClockSpeed: 200,
          gameIsActive: true,
          currentScreen: Screens.Game,
          setCurrentGame: () => {},
          setCurrentWinner: () => {},
          setComputerClockSpeed: () => {},
          setGameIsActive: () => {},
          setCurrentScreen: () => {},
        }
        const { queryByTestId } = renderGameScreen(arcadeState)

        await wait()

        expect(queryByTestId("game-over-lose")).toBe(null)
        expect(queryByTestId("game-over-win")).not.toBe(null)
      })
    })
  })
})
