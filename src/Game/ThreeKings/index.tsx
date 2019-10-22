import React, { useContext } from "react"
import { View, Text, StyleSheet } from "react-native"

import Board from "../Board"
import ThreeKingsContext, { ThreeKingsProvider } from "./ThreeKingsContext"

import { Typography } from "../../styles"

const ThreeKingsGame = () => {
  const {
    board,
    countdownCount,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
  } = useContext(ThreeKingsContext)
  return (
    <Board
      board={board}
      countdownCount={countdownCount}
      userSelectedTile={userSelectedTile}
      computerSelectedTile={computerSelectedTile}
      selectUserTile={selectUserTile}
    />
  )
}

const ThreeKings = () => {
  return (
    <ThreeKingsProvider>
      <View style={styles.container} testID={"game"}>
        <Text style={Typography.header}>ThreeKings</Text>
        <ThreeKingsGame />
      </View>
    </ThreeKingsProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ThreeKings
