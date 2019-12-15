import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"

import Piece from "./Piece"
import { Piece as PieceType, Empty } from "../utils/chess/chess"
import {
  BoardRow as BoardRowType,
  Tile,
  tilesAreEqual,
} from "../utils/game_helpers"

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

  const tileIsSelected = (tile: Tile) => {
    return (
      (userSelectedTile ? tilesAreEqual(tile, userSelectedTile) : false) ||
      (computerSelectedTile ? tilesAreEqual(tile, computerSelectedTile) : false)
    )
  }

  return (
    <View style={styles.container}>
      {row.map((piece: PieceType | Empty, colIdx: number) => {
        const tile = { rowIdx, colIdx }
        const tileStyle = createTileStyle(tile)
        const handleOnPress = () => {
          selectUserTile(tile)
        }
        const isSelected = tileIsSelected(tile)

        return (
          <TouchableOpacity
            onPress={handleOnPress}
            style={[styles.tile, tileStyle]}
            key={`tile-${rowIdx}-${colIdx}`}
          >
            <View key={`col-${colIdx}`} style={cooldownStyle(piece)}>
              <Piece piece={piece} isSelected={isSelected} />
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
