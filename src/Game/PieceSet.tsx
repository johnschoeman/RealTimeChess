import React from "react"

import Piece from "./Piece"
import { Board as BoardType, Tile as TileType } from "../utils/game_helpers"

interface PieceSetProps {
  board: BoardType
  isSelected: (tile: TileType) => boolean
  selectUserTile: (tile: TileType) => void
}

const PieceSet = ({ board, isSelected, selectUserTile }: PieceSetProps) => {
  return (
    <>
      {board.flatMap((row, rowIdx) => {
        return row.map((piece, colIdx) => {
          const tile = { rowIdx, colIdx }
          const selected = isSelected(tile)
          return piece.isPiece ? (
            <Piece
              key={`piece-${piece.fenId}-${rowIdx}-${colIdx}`}
              piece={piece}
              isSelected={selected}
              selectUserTile={selectUserTile}
              tile={tile}
            />
          ) : null
        })
      })}
    </>
  )
}

export default PieceSet
