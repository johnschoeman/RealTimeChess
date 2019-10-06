import React, { useContext } from "react"
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native"

import Board from "./Board"
import GameOver from "./GameOver"
import GameContext from "../GameContext"

import { Color, Typography, Buttons, Spacing } from "../styles"

const GameScreen = () => {
  const { resetBoard, winner } = useContext(GameContext)

  return (
    <View style={styles.container} testID={"game-screen"}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.headerImage}
            resizeMode="contain"
            source={require("../assets/BoardHeader.png")}
          />
        </View>
      </View>

      <View style={styles.activeGameContainer}>
        {winner == null ? <Board /> : <GameOver winner={winner} />}
      </View>

      <View style={styles.footer}>
        {winner == null ? (
          <TouchableOpacity onPress={() => resetBoard()}>
            <Text style={styles.heading}>Reset Board</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => resetBoard()}
              style={styles.button}
            >
              <Text style={Typography.mainButton}>PLAY AGAIN</Text>
            </TouchableOpacity>
          </View>
        )}
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
    justifyContent: "flex-start",
    width: "100%",
  },
  imageContainer: {
    height: "100%",
  },
  headerImage: {
    flex: 1,
    width: undefined,
  },
  heading: {
    color: Color.white,
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
  buttonContainer: {
    width: "100%",
    ...Buttons.primaryContainer,
  },
  button: {
    ...Buttons.primary,
  },
})

export default GameScreen
