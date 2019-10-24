import React, { useContext } from "react"
import { View, Text, StyleSheet } from "react-native"

import Board from "../Board"
import Hearts from "./Hearts"
import ThreeKingsContext, { ThreeKingsProvider } from "./ThreeKingsContext"

import { Typography } from "../../styles"

const ThreeKingsGame = () => {
  const {
    board,
    countdownCount,
    userSelectedTile,
    computerSelectedTile,
    userLives,
    computerLives,
    selectUserTile,
  } = useContext(ThreeKingsContext)
  return (
    <View>
      <Hearts livesCount={computerLives} />
      <Board
        board={board}
        countdownCount={countdownCount}
        userSelectedTile={userSelectedTile}
        computerSelectedTile={computerSelectedTile}
        selectUserTile={selectUserTile}
      />
      <Hearts livesCount={userLives} />
    </View>
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
