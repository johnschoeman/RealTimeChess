import React from "react"
import { Image, View, StyleSheet } from "react-native"

import { GameProvider } from "./GameContext"
import Game from "./Game"

import { Color, Spacing } from "../styles"

const GameScreen = () => {
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

      <View style={{ flex: 5 }}>
        <GameProvider>
          <Game />
        </GameProvider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Color.background,
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: Spacing.medium,
  },
  imageContainer: {
    height: "100%",
  },
  headerImage: {
    flex: 1,
    width: undefined,
  },
})

export default GameScreen
