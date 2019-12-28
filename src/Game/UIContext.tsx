import React, { createContext, useState } from "react"

import { FenId } from "../utils/chess/types"
import { Tile } from "../utils/game_helpers"

interface PieceUI {
  isMoving: boolean
  toTile: Tile | null
}

type PieceUIs = { [k in FenId]?: PieceUI }

export interface UIState {
  pieceUIs: PieceUIs
}

const initialPieceUIs = {
  Q: { isMoving: false, toTile: null },
  q: { isMoving: false, toTile: null },
}

export const initialUIState = {
  pieceUIs: initialPieceUIs,
}

interface UIProviderProps {
  children: JSX.Element
}

const UIContext = createContext<UIState>(initialUIState)

const UIProvider = ({ children }: UIProviderProps) => {
  const [pieceUIs, setPieceUIs] = useState<PieceUIs>(initialPieceUIs)

  return (
    <UIContext.Provider
      value={{
        pieceUIs,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export { UIProvider }
export default UIContext
