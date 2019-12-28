import React, { useContext } from "react"
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native"

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
    <ImageBackground
      source={Images.Starry}
      style={styles.container}
      testID={"game-over"}
    >
      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View style={styles.imageContainer}>
        {currentWinner === "b" ? (
          <Image
            source={Images.YouLose}
            resizeMode="contain"
            testID={"game-over-lose"}
            style={styles.image}
          />
        ) : (
          <Image
            source={Images.YouWin}
            resizeMode="contain"
            testID={"game-over-win"}
            style={styles.image}
          />
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
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Spacing.xLarge,
  },
  headerContainer: {
    height: "22%",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: Spacing.medium,
    paddingHorizontal: Spacing.medium,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
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
