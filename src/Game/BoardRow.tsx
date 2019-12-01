import React from "react"
import { View, StyleSheet } from "react-native"

import Tile from "./Tile"
import { Piece as PieceType, Empty } from "../utils/chess/chess"
import {
  BoardRow as BoardRowType,
  Tile as TileType,
} from "../utils/game_helpers"

interface BoardRowProps {
  row: BoardRowType
  rowIdx: number
  userSelectedTile: TileType | null
  computerSelectedTile: TileType | null
  selectUserTile: (tile: TileType) => void
}

const BoardRow = ({
  row,
  rowIdx,
  userSelectedTile,
  computerSelectedTile,
  selectUserTile,
}: BoardRowProps) => {
  return (
    <View style={styles.container}>
      {row.map((piece: PieceType | Empty, colIdx: number) => {
        let tile = { rowIdx, colIdx }
        let userSelected = isSelected(tile, userSelectedTile)
        let computerSelected = isSelected(tile, computerSelectedTile)
        return (
          <Tile
            tile={tile}
            selectUserTile={selectUserTile}
            piece={piece}
            userSelected={userSelected}
            computerSelected={computerSelected}
          />
        )
      })}
    </View>
  )
}

const isSelected = (tile: TileType, selectedTile: TileType | null) => {
  if (selectedTile !== null) {
    const { rowIdx, colIdx } = tile
    const { rowIdx: selectedRowIdx, colIdx: selectedColIdx } = selectedTile
    return rowIdx === selectedRowIdx && colIdx === selectedColIdx
  } else {
    return false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
})

export default BoardRow
