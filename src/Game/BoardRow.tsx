import React from "react"
import { View, StyleSheet } from "react-native"

import Tile from "./Tile"
import { Piece as PieceType, Empty } from "../utils/chess/chess"
import {
  BoardRow as BoardRowType,
  Tile as TileType,
  tilesAreEqual,
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
  const tileIsSelected = (tile: TileType) => {
    return (
      (userSelectedTile ? tilesAreEqual(tile, userSelectedTile) : false) ||
      (computerSelectedTile ? tilesAreEqual(tile, computerSelectedTile) : false)
    )
  }

  return (
    <View style={styles.container}>
      {row.map((piece: PieceType | Empty, colIdx: number) => {
        const tile = { rowIdx, colIdx }
        const handleOnPress = () => {
          selectUserTile(tile)
        }
        return (
          <Tile
            tile={tile}
            piece={piece}
            selected={tileIsSelected(tile)}
            onPress={handleOnPress}
          />
        )
      })}
    </View>
  )
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
