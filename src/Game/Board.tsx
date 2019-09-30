import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"

import BoardRow from "./BoardRow"
import GameContext from "../GameContext"

import { Spacing } from "../styles"

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
    flex: 1,
    width: "100%",
    height: "100%",
    padding: Spacing.medium,
  },
  row: {
    flex: 1,
  },
})

export default Board
