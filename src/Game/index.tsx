import React, { useContext } from "react"
import { View, StyleSheet, ImageBackground } from "react-native"

import ArcadeContext, { Game } from "../ArcadeContext"
import { UIProvider } from "./UIContext"
import Header from "../Header"
import Classic from "./Classic"
import ThreeKings from "./ThreeKings"
import Cooldown from "./Cooldown"
import Playground from "./Playground"

import { Buttons, Colors, Spacing } from "../styles"
import { Images } from "../assets"

const GameScreen = () => {
  const { currentGame } = useContext(ArcadeContext)

  const selectGame = (game: Game): JSX.Element => {
    switch (game) {
      case "Classic": {
        return <Classic />
      }
      case "ThreeKings": {
        return <ThreeKings />
      }
      case "Cooldown": {
        return <Cooldown />
      }
      case "Playground": {
        return <Playground />
      }
    }
  }

  return (
    <ImageBackground
      source={Images.Starry}
      style={styles.container}
      testID={"game-screen"}
    >
      <View style={styles.headerContainer}>
        <Header />
      </View>

      <UIProvider>
        <View style={styles.gameContainer}>{selectGame(currentGame)}</View>
      </UIProvider>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  headerContainer: {
    height: "22%",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: Spacing.medium,
  },
  gameContainer: {
    flex: 5,
  },
  resetButton: {
    color: Colors.white,
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
