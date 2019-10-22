import React from "react"
import { View, StyleSheet } from "react-native"

import { Board as BoardType, Tile } from "../utils/game_helpers"
import BoardRow from "./BoardRow"
import Countdown from "./Countdown"

import { Layout } from "../styles"

interface BoardProps {
  board: BoardType
  countdownCount: number
  userSelectedTile: Tile | null
  computerSelectedTile: Tile | null
  selectUserTile: (tile: Tile) => void
}

const Board = ({
  board,
  countdownCount,
  userSelectedTile,
  computerSelectedTile,
  selectUserTile,
}: BoardProps) => {
  return (
    <View style={styles.container}>
      {countdownCount >= 0 ? <Countdown count={countdownCount} /> : null}
      {board.map((row, rowIdx) => {
        return (
          <View style={styles.row} key={`row-${rowIdx}`}>
            <BoardRow
              row={row}
              rowIdx={rowIdx}
              userSelectedTile={userSelectedTile}
              computerSelectedTile={computerSelectedTile}
              selectUserTile={selectUserTile}
            />
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
