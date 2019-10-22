import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"

import Piece from "./Piece"
import { PieceType } from "../utils/pieces"
import { BoardRow as BoardRowType, Tile } from "../utils/game_helpers"

import { Color } from "../styles"

interface BoardRowProps {
  row: BoardRowType
  rowIdx: number
  userSelectedTile: Tile | null
  computerSelectedTile: Tile | null
  selectUserTile: (tile: Tile) => void
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
      {row.map((piece: PieceType, colIdx: number) => {
        let tile = { rowIdx, colIdx }
        let tileStyle = createTileStyle(tile)
        let userSelectedStyle = createSelectedStyle(
          tile,
          userSelectedTile,
          Color.userHighlight
        )
        let computerSelectedStyle = createSelectedStyle(
          tile,
          computerSelectedTile,
          Color.computerHighlight
        )
        return (
          <TouchableOpacity
            onPress={() => selectUserTile(tile)}
            style={[
              styles.tile,
              tileStyle,
              userSelectedStyle,
              computerSelectedStyle,
            ]}
            key={`col-${colIdx}`}
          >
            <Piece piece={piece} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

function createTileStyle(tile: Tile) {
  const { rowIdx, colIdx } = tile
  const tileColor =
    (rowIdx + colIdx) % 2 === 0 ? Color.tileWhite : Color.tileBlack
  return { backgroundColor: tileColor, borderColor: tileColor }
}

const createSelectedStyle = (
  tile: Tile,
  selectedTile: Tile | null,
  color: string
) => {
  if (selectedTile !== null) {
    const { rowIdx, colIdx } = tile
    const { rowIdx: selectedRowIdx, colIdx: selectedColIdx } = selectedTile
    return rowIdx === selectedRowIdx && colIdx === selectedColIdx
      ? { borderColor: color }
      : {}
  } else {
    return {}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  tile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
  },
  piece: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 30,
    width: 30,
  },
})

export default BoardRow
