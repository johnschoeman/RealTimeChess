import React from "react"
import { render, cleanup, wait } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import Game from "../../Game/Game"
import GameContext, {
  GameState,
  initialGameState,
} from "../../Game/GameContext"
import { BoardFixtures } from "../__fixtures__"

afterEach(cleanup)

const renderGameScreen = (value: GameState) => {
  return render(
    <GameContext.Provider value={value}>
      <Game />
    </GameContext.Provider>
  )
}

describe("Game", () => {
  test("it renders with default game state", () => {
    const { getByTestId } = renderGameScreen(initialGameState)

    expect(getByTestId("game")).toBeDefined()
  })

  describe("when the game is over", () => {
    describe("and when black has won the game", () => {
      test("a 'You Lose' message is visable", async () => {
        const gameState: GameState = {
          board: BoardFixtures.blackWonGame,
          userSelectedTile: null,
          computerSelectedTile: null,
          winner: "black",
          resetBoard: jest.fn(),
          selectUserTile: jest.fn(),
        }
        const { queryByTestId } = renderGameScreen(gameState)

        await wait()

        expect(queryByTestId("game-over-lose")).not.toBe(null)
        expect(queryByTestId("game-over-win")).toBe(null)
      })
    })

    describe("and when white has won the game", () => {
      test("a 'You Won' message is visable", () => {
        const gameState: GameState = {
          board: BoardFixtures.whiteWonGame,
          userSelectedTile: null,
          computerSelectedTile: null,
          winner: "white",
          resetBoard: jest.fn(),
          selectUserTile: jest.fn(),
        }
        const { queryByTestId } = renderGameScreen(gameState)

        expect(queryByTestId("game-over-lose")).toBe(null)
        expect(queryByTestId("game-over-win")).not.toBe(null)
      })
    })
  })
})
