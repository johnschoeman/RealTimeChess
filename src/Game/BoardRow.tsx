import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"

import Piece from "./Piece"
import { Piece as PieceType, Empty } from "../utils/chess/chess"
import { BoardRow as BoardRowType, Tile } from "../utils/game_helpers"

import { Colors } from "../styles"

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
  const cooldownStyle = (piece: PieceType | Empty) => {
    const { isPiece, cooldown } = piece
    const cooldownColor = (cooldown: number): string => {
      const base = cooldown / 10
      return `rgba(64, 95, 237, ${base})`
    }

    return isPiece && cooldown && cooldown > 0
      ? { flex: 1, width: "100%", backgroundColor: cooldownColor(cooldown) }
      : null
  }

  return (
    <View style={styles.container}>
      {row.map((piece: PieceType | Empty, colIdx: number) => {
        let tile = { rowIdx, colIdx }
        let tileStyle = createTileStyle(tile)
        let userSelectedStyle = createSelectedStyle(
          tile,
          userSelectedTile,
          Colors.userHighlight
        )
        let computerSelectedStyle = createSelectedStyle(
          tile,
          computerSelectedTile,
          Colors.computerHighlight
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
            <View style={cooldownStyle(piece)}>
              <Piece piece={piece} />
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

function createTileStyle(tile: Tile) {
  const { rowIdx, colIdx } = tile
  const tileColor =
    (rowIdx + colIdx) % 2 === 0 ? Colors.tileWhite : Colors.tileBlack
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
