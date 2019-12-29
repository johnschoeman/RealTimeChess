import React, { createContext, useState } from "react"

import { Tile } from "../utils/game_helpers"

interface MovingPiece {
  fromTile: Tile
  toTile: Tile
}

export interface UIState {
  movingPieces: MovingPiece[]
  animateMove: (fromTile: Tile, toTile: Tile) => void
  finishMovingPiece: (fromTile: Tile, toTile: Tile) => void
}

export const initialUIState = {
  movingPieces: [],
  animateMove: () => {},
  finishMovingPiece: () => {}
}

interface UIProviderProps {
  children: JSX.Element
}

const UIContext = createContext<UIState>(initialUIState)

const UIProvider = ({ children }: UIProviderProps) => {
  const [movingPieces, setMovingPieces] = useState<MovingPiece[]>([])

  const animateMove = (fromTile: Tile, toTile: Tile) => {
    setMovingPieces([...movingPieces, {fromTile, toTile}])
  }

  const finishMovingPiece = (fromTile: Tile, toTile: Tile) => {
    const oldPieces = [...movingPieces]
    const newMovingPieces = oldPieces.filter(({fromTile: from, toTile: to}) => {
      return fromTile !== from && toTile !== to
    }) 
    setMovingPieces(newMovingPieces)
  }

  return (
    <UIContext.Provider
      value={{
        movingPieces,
        animateMove,
        finishMovingPiece
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export { UIProvider }
export default UIContext
