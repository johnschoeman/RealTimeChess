import React, { createContext, useState } from "react"

import { Side } from "./utils/chess/types"
export type Game = "Classic" | "ThreeKings" | "Cooldown"

export const Games: { [k in Game]: Game } = {
  Classic: "Classic",
  ThreeKings: "ThreeKings",
  Cooldown: "Cooldown",
}

export interface ArcadeState {
  currentGame: Game
  currentWinner: Side | null
  computerClockSpeed: number
  gameIsActive: boolean
  onLanding: boolean
  setCurrentGame: (game: Game) => void
  setCurrentWinner: (side: Side | null) => void
  setComputerClockSpeed: (speed: number) => void
  setGameIsActive: (state: boolean) => void
  goToGame: () => void
}

export const initialArcadeState = {
  currentGame: "Classic" as Game,
  currentWinner: null,
  computerClockSpeed: 600,
  gameIsActive: false,
  onLanding: true,
  setCurrentGame: () => {},
  setCurrentWinner: () => {},
  setGameIsActive: () => {},
  setComputerClockSpeed: () => {},
  goToGame: () => {},
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
  const [onLanding, setOnLanding] = useState<boolean>(
    initialArcadeState.onLanding
  )

  const goToGame = () => {
    setOnLanding(false)
  }

  return (
    <ArcadeContext.Provider
      value={{
        currentGame,
        currentWinner,
        computerClockSpeed,
        gameIsActive,
        onLanding,
        setCurrentGame,
        setCurrentWinner,
        setComputerClockSpeed,
        setGameIsActive,
        goToGame,
      }}
    >
      {children}
    </ArcadeContext.Provider>
  )
}

export { ArcadeProvider }
export default ArcadeContext
