import React from "react"
import { View, ImageBackground, StyleSheet } from "react-native"

import StartGameButtons from "../StartGameButtons"

import { Spacing } from "../styles"

const LandingScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/Welcome.png")}
      style={styles.container}
    >
      <View style={styles.footer}>
        <StartGameButtons />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  footer: {
    paddingLeft: Spacing.medium,
    paddingRight: Spacing.medium,
    height: "22%",
  },
})

export default LandingScreen
