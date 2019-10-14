import React, { useContext } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

import Board from "./Board"
import GameOver from "./GameOver"
import GameContext from "./GameContext"

import { Color, Typography, Buttons, Spacing } from "../styles"

const Game = () => {
  const { resetBoard, winner } = useContext(GameContext)

  return (
    <View style={styles.container} testID={"game"}>
      <View style={styles.activeGameContainer}>
        {winner == null ? <Board /> : <GameOver winner={winner} />}
      </View>

      <View style={styles.footer}>
        {winner !== null ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => resetBoard()}
              style={styles.button}
            >
              <Text style={Typography.mainButton}>PLAY AGAIN</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activeGameContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.xLarge,
  },
  resetButton: {
    color: Color.white,
  },
  buttonContainer: {
    width: "100%",
    ...Buttons.primaryContainer,
  },
  button: {
    ...Buttons.primary,
  },
})

export default Game
