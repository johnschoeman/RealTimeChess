import React, { useContext } from "react"
import { View, Text, StyleSheet } from "react-native"

import Board from "../Board"
import CooldownContext, { CooldownProvider } from "./CooldownContext"

import { Typography } from "../../styles"

const CooldownGame = () => {
  const {
    board,
    countdownCount,
    userSelectedTile,
    computerSelectedTile,
    selectUserTile,
  } = useContext(CooldownContext)
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

const Cooldown = () => {
  return (
    <CooldownProvider>
      <View style={styles.container} testID={"game"}>
        <View style={styles.headerContainer}>
          <Text style={Typography.header}>Cooldown</Text>
        </View>
        <View style={styles.gameContainer}>
          <CooldownGame />
        </View>
      </View>
    </CooldownProvider>
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

export default Cooldown
