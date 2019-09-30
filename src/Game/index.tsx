import React, { useContext } from "react"
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native"

import Board from "./Board"
import GameContext from "../GameContext"

import { Color } from "../styles"

const GameScreen = () => {
  const { resetBoard } = useContext(GameContext)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          resizeMode="contain"
          source={require("../../assets/images/BoardHeader.png")}
        />
      </View>

      <View style={styles.board}>
        <Board />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => resetBoard()}>
          <Text style={styles.heading}>Reset Board</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: Color.background,
  },
  header: {
    flex: 1,
  },
  headerImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  heading: {
    color: Color.white,
  },
  board: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default GameScreen
