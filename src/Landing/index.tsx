import React, { useContext } from "react"
import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { NavigationScreenProp } from "react-navigation"

import AracadeContext from "../ArcadeContext"

import { Buttons, Spacing, Typography } from "../styles"

interface LandingScreenProps {
  navigation: NavigationScreenProp<{}>
}

const LandingScreen = ({ navigation }: LandingScreenProps) => {
  const { setCurrentGame } = useContext(AracadeContext)

  const handlePressClassGame = () => {
    setCurrentGame("Classic")
    navigation.navigate("Game")
  }

  const handlePressThreeKings = () => {
    setCurrentGame("ThreeKings")
    navigation.navigate("Game")
  }

  return (
    <ImageBackground
      source={require("../assets/Welcome.png")}
      style={styles.container}
    >
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlePressClassGame}
            style={styles.button}
          >
            <Text style={Typography.mainButton}>PLAY CLASSIC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePressThreeKings}
            style={styles.button}
          >
            <Text style={Typography.mainButton}>PLAY 3 KINGS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.xLarge,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    ...Buttons.primaryContainer,
  },
  button: {
    ...Buttons.primary,
  },
})

export default LandingScreen
