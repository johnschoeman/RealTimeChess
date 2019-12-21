import React from "react"
import { View, StyleSheet } from "react-native"

import { Board as BoardType, Tile as TileType } from "../utils/game_helpers"
import Tile from "./Tile"

interface tileSetProps {
  board: BoardType
  isSelected: (tile: TileType) => boolean
  selectUserTile: (tile: TileType) => void
}

const TileSet = ({ board, isSelected, selectUserTile }: tileSetProps) => {
  return (
    <>
      {board.map((row, rowIdx) => {
        return (
          <View style={styles.row} key={`row-${rowIdx}`}>
            {row.map((_piece, colIdx) => {
              const tile = { rowIdx, colIdx }
              const selected = isSelected(tile)
              return (
                <Tile
                  tile={tile}
                  selected={selected}
                  selectUserTile={selectUserTile}
                  key={`tile-${rowIdx}-${colIdx}`}
                />
              )
            })}
          </View>
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
})

export default TileSet
