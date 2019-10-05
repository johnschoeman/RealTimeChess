import React from "react"
import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { NavigationScreenProp } from "react-navigation"

import { Buttons, Spacing, Typography } from "../styles"

interface LandingScreenProps {
  navigation: NavigationScreenProp<{}>
}

const LandingScreen = ({ navigation }: LandingScreenProps) => (
  <ImageBackground
    source={require("../assets/Welcome.png")}
    style={styles.container}
  >
    <View style={styles.footer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Game")}
          style={styles.button}
        >
          <Text style={Typography.mainButton}>PLAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
)

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
