import React, { useContext } from "react"
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

import ArcadeContext, { Screens } from "../ArcadeContext"

import { Images } from "../assets"
import { Spacing, Typography, Buttons } from "../styles"

const LandingScreen = () => {
  const { setCurrentScreen } = useContext(ArcadeContext)
  const handleOnPress = () => {
    setCurrentScreen(Screens.Menu)
  }
  return (
    <ImageBackground source={Images.Welcome} style={styles.container}>
      <View style={styles.footer}>
        <View style={styles.insertCoinButtonContainer}>
          <TouchableOpacity
            onPress={handleOnPress}
            style={styles.insertCoinButton}
          >
            <Text style={styles.insertCoinText}>Insert Coin</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    paddingLeft: Spacing.medium,
    paddingRight: Spacing.medium,
    height: "22%",
  },
  insertCoinButtonContainer: {
    ...Buttons.primaryContainer,
  },
  insertCoinButton: {
    ...Buttons.primary,
  },
  insertCoinText: {
    ...Typography.mainButton,
  },
})

export default LandingScreen
