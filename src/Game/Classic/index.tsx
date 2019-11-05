import React, { useContext } from "react"
import { View, Text, StyleSheet } from "react-native"

import Board from "../Board"
import ClassicContext, { ClassicProvider } from "./ClassicContext"

import { Typography } from "../../styles"

const ClassicGame = () => {
  const {
    board,
    countdownCount,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
  } = useContext(ClassicContext)
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

const Classic = () => {
  return (
    <ClassicProvider>
      <View style={styles.container} testID={"game"}>
        <View style={styles.headerContainer}>
          <Text style={Typography.header}>Classic</Text>
        </View>
        <View style={styles.gameContainer}>
          <ClassicGame />
        </View>
      </View>
    </ClassicProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  gameContainer: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
})

export default Classic
