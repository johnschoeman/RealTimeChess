import React from "react"
import { View, StyleSheet } from "react-native"

import {
  Board as BoardType,
  Tile as TileType,
  tilesAreEqual,
} from "../utils/game_helpers"
import TileSet from "./TileSet"
import PieceSet from "./PieceSet"

import { Layout } from '../styles'

interface BoardProps {
  board: BoardType
  userSelectedTile: TileType | null
  computerSelectedTile: TileType | null
  selectUserTile: (tile: TileType) => void
}

const Board = ({
  board,
  userSelectedTile,
  computerSelectedTile,
  selectUserTile,
}: BoardProps) => {
  const isSelected = (tile: TileType): boolean => {
    return (
      (userSelectedTile ? tilesAreEqual(tile, userSelectedTile) : false) ||
      (computerSelectedTile ? tilesAreEqual(tile, computerSelectedTile) : false)
    )
  }

  return (
    <View style={styles.container}>
      <TileSet
        board={board}
        isSelected={isSelected}
        selectUserTile={selectUserTile}
      />
      <PieceSet
        board={board}
        isSelected={isSelected}
        selectUserTile={selectUserTile}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Layout.boardWidth,
    height: Layout.boardHeight,
  },
})

export default Board
