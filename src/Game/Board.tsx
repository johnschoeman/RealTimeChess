import React from "react"
import { View, StyleSheet } from "react-native"

import {
  Board as BoardType,
  Tile as TileType,
  tilesAreEqual,
} from "../utils/game_helpers"
import { Piece as PieceType, Empty } from "../utils/chess/chess"
import Tile from "./Tile"

import { Layout } from "../styles"

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
  const tileIsSelected = (tile: TileType) => {
    return (
      (userSelectedTile ? tilesAreEqual(tile, userSelectedTile) : false) ||
      (computerSelectedTile ? tilesAreEqual(tile, computerSelectedTile) : false)
    )
  }

  return (
    <View style={styles.container}>
      {board.map((row, rowIdx) => {
        return (
          <View style={styles.row} key={`row-${rowIdx}`}>
            {row.map((piece: PieceType | Empty, colIdx: number) => {
              const tile = { rowIdx, colIdx }
              const handleOnPress = () => {
                selectUserTile(tile)
              }
              const isSelected = tileIsSelected(tile)

              return (
                <Tile
                  tile={tile}
                  piece={piece}
                  selected={isSelected}
                  onPress={handleOnPress}
                  key={`tile-${rowIdx}-${colIdx}`}
                />
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Layout.boardWidth,
    height: Layout.boardHeight,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
})

export default Board
