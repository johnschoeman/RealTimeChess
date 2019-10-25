import React, { useContext } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

import AracadeContext from "./ArcadeContext"

import { Buttons, Typography } from "./styles"

const StartGameButtons = () => {
  const { setCurrentGame, setCurrentWinner, goToGame } = useContext(
    AracadeContext
  )

  const handlePressClassGame = () => {
    setCurrentGame("Classic")
    setCurrentWinner(null)
    goToGame()
  }

  const handlePressThreeKings = () => {
    setCurrentGame("ThreeKings")
    setCurrentWinner(null)
    goToGame()
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePressClassGame} style={styles.button}>
          <Text style={Typography.mainButton}>PLAY CLASSIC</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePressThreeKings} style={styles.button}>
          <Text style={Typography.mainButton}>PLAY 3 KINGS</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  buttonContainer: {
    ...Buttons.primaryContainer,
  },
  button: {
    ...Buttons.primary,
  },
})

export default StartGameButtons
