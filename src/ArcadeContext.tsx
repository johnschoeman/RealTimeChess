import React, { createContext, useState } from "react"

import { Side } from "./utils/chess/types"
export type Game = "Classic" | "ThreeKings"

export interface ArcadeState {
  currentGame: Game | null
  currentWinner: Side | null
  onLanding: boolean
  setCurrentGame: (game: Game | null) => void
  setCurrentWinner: (side: Side | null) => void
  goToGame: () => void
}

export const initialArcadeState = {
  currentGame: null,
  currentWinner: null,
  onLanding: true,
  setCurrentGame: () => {},
  setCurrentWinner: () => {},
  goToGame: () => {},
}

const ArcadeContext = createContext<ArcadeState>(initialArcadeState)

interface GameProviderProps {
  children: JSX.Element
}

const ArcadeProvider = ({ children }: GameProviderProps) => {
  const [currentGame, setCurrentGame] = useState<Game | null>("Classic")
  const [currentWinner, setCurrentWinner] = useState<Side | null>(null)
  const [onLanding, setOnLanding] = useState<boolean>(true)

  const goToGame = () => {
    setOnLanding(false)
  }

  return (
    <ArcadeContext.Provider
      value={{
        currentGame,
        currentWinner,
        onLanding,
        setCurrentGame,
        setCurrentWinner,
        goToGame,
      }}
    >
      {children}
    </ArcadeContext.Provider>
  )
}

export { ArcadeProvider }
export default ArcadeContext
