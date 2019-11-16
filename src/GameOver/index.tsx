import React, { useContext } from "react"
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native"

import Header from "../Header"
import ArcadeContext, { Screens } from "../ArcadeContext"

import { Images } from "../assets"
import { Spacing, Buttons, Typography } from "../styles"

const GameOver = () => {
  const { currentWinner, setCurrentWinner, setCurrentScreen } = useContext(
    ArcadeContext
  )

  const handleOnPressPlayAgain = () => {
    setCurrentWinner(null)
  }

  const handleOnPressMainMenu = () => {
    setCurrentScreen(Screens.Menu)
  }
  return (
    <View style={styles.container} testID={"game-over"}>
      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View style={styles.imageContainer}>
        {currentWinner === "b" ? (
          <Image source={Images.YouLose} testID={"game-over-lose"} />
        ) : (
          <Image source={Images.YouWin} testID={"game-over-win"} />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleOnPressPlayAgain}
          style={styles.playAgainContainer}
        >
          <Text style={styles.playAgainText}>INSERT COIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOnPressMainMenu}
          style={styles.goToMainContainer}
        >
          <Text style={styles.goToMainText}>RETURN TO MAIN MENU</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.xLarge,
  },
  headerContainer: {
    height: "22%",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: Spacing.medium,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingLeft: Spacing.medium,
    paddingRight: Spacing.medium,
    height: "22%",
  },
  playAgainContainer: {
    ...Buttons.largeBlueBorder,
  },
  playAgainText: {
    ...Typography.largeWhite,
  },
  goToMainContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.large,
  },
  goToMainText: {
    ...Typography.smallWhite,
  },
})

export default GameOver
