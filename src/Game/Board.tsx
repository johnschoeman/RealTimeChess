import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"

import BoardRow from "./BoardRow"
import GameContext from "../GameContext"

import { Layout } from "../styles"

const Board = () => {
  const { board } = useContext(GameContext)
  return (
    <View style={styles.container}>
      {board.map((row, rowIdx) => {
        return (
          <View style={styles.row} key={`row-${rowIdx}`}>
            <BoardRow row={row} rowIdx={rowIdx} />
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
  },
})

export default Board
