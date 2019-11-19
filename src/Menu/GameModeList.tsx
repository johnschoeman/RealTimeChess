import React, { useContext } from "react"
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native"

import AracadeContext, { Screens, Games, Game } from "../ArcadeContext"
import { Images } from "../assets"
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
    source,
  }: {
    onPress: () => void
    source: ImageSourcePropType
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <Image
          source={source}
          resizeMode={"contain"}
          style={styles.button}
        ></Image>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <StartGameButton onPress={handlePressClassGame} source={Images.Basic} />
      <StartGameButton
        onPress={handlePressThreeKings}
        source={Images.ThreeKings}
      />
      <StartGameButton onPress={handlePressCooldown} source={Images.Cooldown} />
      <StartGameButton onPress={handlePressPlayground} source={Images.Basic} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    height: 110,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    width: undefined,
  },
})

export default GameModeList
