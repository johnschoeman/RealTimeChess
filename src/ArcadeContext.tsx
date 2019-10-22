import React, { createContext, useState } from "react"

import { Side } from "./utils/chess/types"
export type Game = "Classic" | "ThreeKings"

interface ArcadeState {
  currentGame: Game | null
  currentWinner: Side | null
  setCurrentGame: (game: Game) => void
  setCurrentWinner: (side: Side) => void
}

const initialArcadeState = {
  currentGame: null,
  currentWinner: null,
  setCurrentGame: () => {},
  setCurrentWinner: () => {},
}

const ArcadeContext = createContext<ArcadeState>(initialArcadeState)

interface GameProviderProps {
  children: JSX.Element
}

const ArcadeProvider = ({ children }: GameProviderProps) => {
  const [currentGame, setCurrentGame] = useState<Game | null>("Classic")
  const [currentWinner, setCurrentWinner] = useState<Side | null>(null)

  return (
    <ArcadeContext.Provider
      value={{ currentGame, currentWinner, setCurrentGame, setCurrentWinner }}
    >
      {children}
    </ArcadeContext.Provider>
  )
}

export { ArcadeProvider }
export default ArcadeContext
