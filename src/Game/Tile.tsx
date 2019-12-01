import React from "react"
import { View, StyleSheet, TouchableOpacity, ViewStyle } from "react-native"

import Piece from "./Piece"
import { Piece as PieceType, Empty } from "../utils/chess/chess"
import { Tile as TileType } from "../utils/game_helpers"

import { Colors } from "../styles"

interface TileProps {
  tile: TileType
  selectUserTile: (tile: TileType) => void
  piece: PieceType | Empty
  userSelected: boolean
  computerSelected: boolean
}

const Tile = ({
  tile,
  selectUserTile,
  piece,
  userSelected,
  computerSelected,
}: TileProps) => {
  const cooldownStyle = (piece: PieceType | Empty) => {
    const { isPiece, cooldown } = piece
    const cooldownColor = (cooldown: number): string => {
      const base = cooldown / 10
      return `rgba(64, 95, 237, ${base})`
    }

    return isPiece && cooldown && cooldown > 0
      ? {
          flex: 1,
          width: "100%",
          backgroundColor: cooldownColor(cooldown),
        }
      : null
  }

  let tileStyle = createTileStyle(tile)
  let userSelectedStyle = createSelectedStyle(
    userSelected,
    Colors.userHighlight
  )
  let computerSelectedStyle = createSelectedStyle(
    computerSelected,
    Colors.computerHighlight
  )

  const handleOnPress = () => {
    selectUserTile(tile)
  }

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[styles.tile, tileStyle, userSelectedStyle, computerSelectedStyle]}
    >
      <View
        style={[
          { justifyContent: "center", alignItems: "center" },
          cooldownStyle(piece),
        ]}
      >
        <Piece piece={piece} />
      </View>
    </TouchableOpacity>
  )
}

const createSelectedStyle = (selected: boolean, color: string): ViewStyle => {
  return selected ? { borderColor: color } : {}
}

function createTileStyle(tile: TileType) {
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

export default Tile
