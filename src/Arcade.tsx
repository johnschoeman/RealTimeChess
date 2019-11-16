import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"

import ArcadeContext, { Screens } from "./ArcadeContext"
import LandingScreen from "./Landing"
import MenuScreen from "./Menu"
import GameScreen from "./Game"
import GameOverScreen from "./GameOver"

const Arcade = () => {
  const { currentWinner, currentScreen } = useContext(ArcadeContext)

  const chooseScreen = () => {
    switch (currentScreen) {
      case Screens.Landing: {
        return <LandingScreen />
      }
      case Screens.Menu: {
        return <MenuScreen />
      }
      case Screens.Game: {
        return currentWinner == null ? <GameScreen /> : <GameOverScreen />
      }
      default: {
        return <LandingScreen />
      }
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
