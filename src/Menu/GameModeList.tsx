import React, { useContext } from "react"
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native"

import AracadeContext, { Screens, Games, Game } from "../ArcadeContext"

import { Typography, Colors } from "../styles"

const GameModeList = () => {
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
    <ScrollView style={styles.container}>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  buttonContainer: {
    paddingVertical: 12,
  },
  button: {
    backgroundColor: Colors.white,
    height: 120,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
})

export default GameModeList
