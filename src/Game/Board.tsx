import React, { useContext, useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"

import BoardRow from "./BoardRow"
import GameContext from "./GameContext"
import Countdown from "./Countdown"

import { Layout } from "../styles"

const Board = () => {
  const { board, setGameIsActive } = useContext(GameContext)
  const [count, setCount] = useState<number>(3)
  const [isActive, setIsActive] = useState<boolean>(true)

  useEffect(() => {
    let intervalId: number = 0
    if (isActive) {
      intervalId = setInterval(() => {
        setCount((count: number) => count - 1)
      }, 1000)
      if (count < 0) {
        setIsActive(false)
        clearInterval(intervalId)
        setGameIsActive(true)
      }
    }

    return () => clearInterval(intervalId)
  }, [isActive, count])

  return (
    <View style={styles.container}>
      {count >= 0 ? <Countdown count={count} /> : null}
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
