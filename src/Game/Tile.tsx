import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"

import { Tile as TileType } from "../utils/game_helpers"

import { Layout, Colors } from "../styles"

interface TileProps {
  tile: { rowIdx: number; colIdx: number }
  selected: boolean
  selectUserTile: (tile: TileType) => void
}

const Tile = ({ tile, selected, selectUserTile }: TileProps) => {
  const createTileStyle = (tile: TileType) => {
    const { rowIdx, colIdx } = tile
    const tileColor =
      (rowIdx + colIdx) % 2 === 0 ? Colors.tileWhite : Colors.tileBlack
    return { backgroundColor: tileColor, borderColor: tileColor }
  }

  const tileStyle = createTileStyle(tile)

  const selectedStyle = (selected: boolean) => {
    return selected ? { backgroundColor: Colors.yellow } : null
  }

  const handleOnPress = () => {
    selectUserTile(tile)
  }

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View
        style={[styles.container, tileStyle, selectedStyle(selected)]}
      ></View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Layout.tileWidth,
    height: Layout.tileHeight,
  },
})

export default Tile
