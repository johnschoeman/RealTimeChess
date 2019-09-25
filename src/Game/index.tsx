import React, { useContext } from "react"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

import Board from "./Board"
import GameContext from "../GameContext"

import { Color } from "../styles"

const GameScreen = ({ navigation }: { navigation: any }) => {
  const { resetBoard } = useContext(GameContext)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Real Time Chess</Text>
      </View>

      <View style={styles.board}>
        <Board />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => resetBoard()}>
          <Text>Reset Board</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: Color.background,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  board: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
})

export default GameScreen
