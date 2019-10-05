import React from "react"
import { render, cleanup } from "@testing-library/react-native"
import "@testing-library/jest-native/extend-expect"

import GameScreen from "../../Game"
import GameContext, { GameState, initialGameState } from "../../GameContext"
import { BoardFixtures } from "../__fixtures__"

afterEach(cleanup)

const renderGameScreen = (value: GameState) => {
  return render(
    <GameContext.Provider value={value}>
      <GameScreen />
    </GameContext.Provider>
  )
}

describe("GameScreen", () => {
  test("it renders with default game state", () => {
    const { getByTestId } = renderGameScreen(initialGameState)

    expect(getByTestId("game-screen")).toBeDefined()
  })

  describe("when the game is over", () => {
    describe("and when black has won the game", () => {
      test("a 'You Lose' message is visable", () => {
        const gameState: GameState = {
          board: BoardFixtures.blackWonGame,
          userSelectedTile: null,
          computerSelectedTile: null,
          winner: "black",
          resetBoard: jest.fn(),
          selectUserTile: jest.fn(),
        }
        const { queryByTestId } = renderGameScreen(gameState)

        expect(queryByTestId("win-message")).toHaveTextContent("You Lose!")
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

        expect(queryByTestId("win-message")).toHaveTextContent("You Win!")
      })
    })
  })
})
