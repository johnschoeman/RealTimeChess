import React, { useContext } from "react"
import { Text, TouchableOpacity, Image, View, StyleSheet } from "react-native"

import ArcadeContext, { Game } from "../ArcadeContext"
import GameOver from "./GameOver"
import Classic from "./Classic"
import ThreeKings from "./ThreeKings"

import { Buttons, Typography, Color, Spacing } from "../styles"

const GameScreen = () => {
  const { currentGame, currentWinner, setCurrentWinner } = useContext(
    ArcadeContext
  )

  const selectGame = (game: Game | null): JSX.Element => {
    switch (game) {
      case "Classic": {
        return <Classic setCurrentWinner={setCurrentWinner} />
      }
      case "ThreeKings": {
        return <ThreeKings />
      }
      default: {
        return <Classic />
      }
    }
  }

  const resetBoard = () => {}

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

      <View style={styles.content}>
        {currentWinner == null ? (
          selectGame(currentGame)
        ) : (
          <>
            <GameOver winner={currentWinner} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => resetBoard()}
                style={styles.button}
              >
                <Text style={Typography.mainButton}>PLAY AGAIN</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Color.background,
    borderWidth: 1,
    borderColor: "green",
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
  content: {
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
