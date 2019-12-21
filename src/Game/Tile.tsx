import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"

import Piece from "./Piece"
import { Piece as PieceType, Empty } from "../utils/chess/chess"
import { Tile as TileType } from "../utils/game_helpers"

import { Colors } from "../styles"

interface TileProps {
  tile: { rowIdx: number; colIdx: number }
  piece: PieceType | Empty
  selected: boolean
  onPress: () => void
}

const Tile = ({ tile, piece, selected, onPress }: TileProps) => {
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

  const createTileStyle = (tile: TileType) => {
    const { rowIdx, colIdx } = tile
    const tileColor =
      (rowIdx + colIdx) % 2 === 0 ? Colors.tileWhite : Colors.tileBlack
    return { backgroundColor: tileColor, borderColor: tileColor }
  }

  const tileStyle = createTileStyle(tile)

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tile, tileStyle]}
    >
      <View style={cooldownStyle(piece)}>
        <Piece piece={piece} isSelected={selected} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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

export default Tile
