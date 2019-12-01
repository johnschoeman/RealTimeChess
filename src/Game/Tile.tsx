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
  const tileStyle = createTileStyle(tile, userSelected, computerSelected)

  const handleOnPress = () => {
    selectUserTile(tile)
  }

  return (
    <TouchableOpacity onPress={handleOnPress} style={[styles.tile, tileStyle]}>
      <View style={[styles.pieceContainer, cooldownStyle(piece)]}>
        <Piece piece={piece} />
      </View>
    </TouchableOpacity>
  )
}

function createTileStyle(
  tile: TileType,
  userSelected: boolean,
  computerSelected: boolean
) {
  const { rowIdx, colIdx } = tile
  const tileColor =
    (rowIdx + colIdx) % 2 === 0 ? Colors.tileWhite : Colors.tileBlack

  const borderColor = () => {
    if (userSelected) {
      return Colors.userHighlight
    } else if (computerSelected) {
      return Colors.computerHighlight
    } else {
      return tileColor
    }
  }

  return { backgroundColor: tileColor, borderColor: borderColor() }
}

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

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
  },
  pieceContainer: {
    justifyContent: "center",
    alignItems: "center",
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
