import React, { useContext } from "react"
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native"

import Board from "./Board"
import GameContext from "../GameContext"
import { GameHelpers } from "../utils"

import { Color } from "../styles"

const GameScreen = () => {
  const { resetBoard, winner } = useContext(GameContext)

  const setGameMessage = (winner: GameHelpers.Side | null): string => {
    if (winner === "black") {
      return "You Lose!"
    } else if (winner === "white") {
      return "You Win!"
    } else {
      return "Game On!"
    }
  }

  return (
    <View style={styles.container} testID={"game-screen"}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          resizeMode="contain"
          source={require("../../assets/images/BoardHeader.png")}
        />
      </View>

      <View style={styles.message}>
        <Text style={styles.messageText} testID={"win-message"}>
          {setGameMessage(winner)}
        </Text>
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
  message: {
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    color: "white",
  },
  heading: {
    color: Color.white,
  },
  board: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default GameScreen
