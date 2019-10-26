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
        <Text style={Typography.header}>Cooldown</Text>
        <CooldownGame />
      </View>
    </CooldownProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Cooldown
