import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"

import ArcadeContext from "./ArcadeContext"
import LandingScreen from "./Landing"
import GameScreen from "./Game"
import GameOverScreen from "./GameOver"

const Arcade = () => {
  const { currentWinner, onLanding } = useContext(ArcadeContext)

  const chooseScreen = () => {
    if (onLanding) {
      return <LandingScreen />
    } else if (currentWinner == null) {
      return <GameScreen />
    } else if (currentWinner != null) {
      return <GameOverScreen />
    } else {
      throw new Error("Invalid Aracade Context State")
    }
  }

  return (
    <View style={styles.container} testID={"arcade"}>
      {chooseScreen()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Arcade
