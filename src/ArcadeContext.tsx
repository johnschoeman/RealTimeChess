import React, { createContext, useState } from "react"

import { Side } from "./utils/chess/types"
export type Game = "Classic" | "ThreeKings" | "Cooldown" | "Playground"

export const Games: { [k in Game]: Game } = {
  Classic: "Classic",
  ThreeKings: "ThreeKings",
  Cooldown: "Cooldown",
  Playground: "Playground",
}

export type Screen = "Landing" | "Menu" | "Game"

export const Screens: { [screen in Screen]: Screen } = {
  Landing: "Landing",
  Menu: "Menu",
  Game: "Game",
}

export interface ArcadeState {
  currentGame: Game
  currentWinner: Side | null
  computerClockSpeed: number
  gameIsActive: boolean
  currentScreen: Screen
  setCurrentGame: (game: Game) => void
  setCurrentWinner: (side: Side | null) => void
  setComputerClockSpeed: (speed: number) => void
  setGameIsActive: (state: boolean) => void
  setCurrentScreen: (screen: Screen) => void
}

export const initialArcadeState = {
  currentGame: Games.Classic,
  currentWinner: null,
  computerClockSpeed: 1000,
  gameIsActive: false,
  currentScreen: Screens.Landing,
  setCurrentGame: () => {},
  setCurrentWinner: () => {},
  setGameIsActive: () => {},
  setComputerClockSpeed: () => {},
  setCurrentScreen: () => {},
}

const ArcadeContext = createContext<ArcadeState>(initialArcadeState)

interface GameProviderProps {
  children: JSX.Element
}

const ArcadeProvider = ({ children }: GameProviderProps) => {
  const [currentGame, setCurrentGame] = useState<Game>(
    initialArcadeState.currentGame
  )
  const [currentWinner, setCurrentWinner] = useState<Side | null>(
    initialArcadeState.currentWinner
  )
  const [computerClockSpeed, setComputerClockSpeed] = useState<number>(
    initialArcadeState.computerClockSpeed
  )
  const [gameIsActive, setGameIsActive] = useState<boolean>(
    initialArcadeState.gameIsActive
  )
  const [currentScreen, setCurrentScreen] = useState<Screen>(
    initialArcadeState.currentScreen
  )

  return (
    <ArcadeContext.Provider
      value={{
        currentGame,
        currentWinner,
        computerClockSpeed,
        gameIsActive,
        currentScreen,
        setCurrentGame,
        setCurrentWinner,
        setComputerClockSpeed,
        setGameIsActive,
        setCurrentScreen,
      }}
    >
      {children}
    </ArcadeContext.Provider>
  )
}

export { ArcadeProvider }
export default ArcadeContext
