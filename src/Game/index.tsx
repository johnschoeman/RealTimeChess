import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"

import ArcadeContext, { Game } from "../ArcadeContext"
import Header from "../Header"
import Classic from "./Classic"
import ThreeKings from "./ThreeKings"

import { Buttons, Color, Spacing } from "../styles"

const GameScreen = () => {
  const { currentGame } = useContext(ArcadeContext)

  const selectGame = (game: Game | null): JSX.Element => {
    switch (game) {
      case "Classic": {
        return <Classic />
      }
      case "ThreeKings": {
        return <ThreeKings />
      }
      default: {
        return <Classic />
      }
    }
  }

  return (
    <View style={styles.container} testID={"game-screen"}>
      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View style={styles.gameContainer}>{selectGame(currentGame)}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Color.background,
  },
  headerContainer: {
    height: "22%",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: Spacing.medium,
  },
  gameContainer: {
    flex: 5,
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

export default GameScreen
