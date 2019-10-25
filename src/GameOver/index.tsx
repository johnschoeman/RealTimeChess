import React, { useContext } from "react"
import { View, Image, StyleSheet } from "react-native"

import Header from "../Header"
import StartGameButtons from "../StartGameButtons"
import ArcadeContext from "../ArcadeContext"

import { Spacing } from "../styles"

const GameOver = () => {
  const { currentWinner } = useContext(ArcadeContext)
  return (
    <View style={styles.container} testID={"game-over"}>
      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View style={styles.imageContainer}>
        {currentWinner === "b" ? (
          <Image
            source={require("../assets/YouLose.png")}
            testID={"game-over-lose"}
          />
        ) : (
          <Image
            source={require("../assets/YouWin.png")}
            testID={"game-over-win"}
          />
        )}
      </View>

      <View style={styles.footer}>
        <StartGameButtons />
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
})

export default GameOver
