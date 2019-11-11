import React, { useContext } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

import AracadeContext, { Screens, Games, Game } from "./ArcadeContext"

import { Buttons, Typography } from "./styles"

const StartGameButtons = () => {
  const { setCurrentGame, setCurrentWinner, setCurrentScreen } = useContext(
    AracadeContext
  )

  const handlePress = (game: Game) => {
    setCurrentGame(game)
    setCurrentWinner(null)
    setCurrentScreen(Screens.Game)
  }

  const handlePressClassGame = () => handlePress(Games.Classic)
  const handlePressThreeKings = () => handlePress(Games.ThreeKings)
  const handlePressCooldown = () => handlePress(Games.Cooldown)
  const handlePressPlayground = () => handlePress(Games.Playground)

  const StartGameButton = ({
    onPress,
    title,
  }: {
    onPress: () => void
    title: Game
  }) => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={Typography.mainButton}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StartGameButton onPress={handlePressClassGame} title={Games.Classic} />
      <StartGameButton
        onPress={handlePressThreeKings}
        title={Games.ThreeKings}
      />
      <StartGameButton onPress={handlePressCooldown} title={Games.Cooldown} />
      <StartGameButton
        onPress={handlePressPlayground}
        title={Games.Playground}
      />
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
