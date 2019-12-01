import React from "react"
import { View, StyleSheet } from "react-native"

import Tile from "./Tile"
import { Board as BoardType, Tile as TileType } from "../utils/game_helpers"
import { Piece as PieceType, Empty } from "../utils/chess/chess"

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
  const tilesMatch = (a: TileType, b: TileType) => {
    return a.rowIdx === b.rowIdx && a.colIdx === b.colIdx
  }

  const isSelected = (tile: TileType, selectedTile: TileType | null) => {
    return !!selectedTile && tilesMatch(tile, selectedTile)
  }

  return (
    <View style={styles.container}>
      {board.map((row, rowIdx) => {
        return (
          <View style={styles.row} key={`row-${rowIdx}`}>
            {row.map((piece: PieceType | Empty, colIdx: number) => {
              const tile = { rowIdx, colIdx }
              const userSelected = isSelected(tile, userSelectedTile)
              const computerSelected = isSelected(tile, computerSelectedTile)
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
