import React, { useContext } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Slider from "@react-native-community/slider"

import ArcadeContext, { Screens } from "../ArcadeContext"

import { Typography, Buttons } from "../styles"

const Settings = () => {
  const {
    setComputerClockSpeed,
    computerClockSpeed,
    setCurrentScreen,
    setGameIsActive,
  } = useContext(ArcadeContext)

  const handleOnValueChange = (value: number) => {
    setComputerClockSpeed(1100 - value * 100)
  }
  const sliderValue = (1100 - computerClockSpeed) / 100

  const handleOnPressMainMenu = () => {
    setCurrentScreen(Screens.Landing)
    setGameIsActive(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.settingsText}>Settings</Text>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>AI Speed</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={sliderValue}
            onValueChange={(value: number) => handleOnValueChange(value)}
          />
          <Text style={styles.inputText}>{sliderValue}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={handleOnPressMainMenu}
            style={styles.quitButton}
          >
            <Text style={styles.quitText}>Go To Main Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  settingsText: {
    ...Typography.darkHeader,
  },
  inputsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  inputText: {
    ...Typography.label,
  },
  slider: {
    width: "60%",
  },
  quitButton: {
    ...Buttons.smallSquareRed,
  },
  quitText: {
    ...Typography.smallWhiteBold,
  },
})

export default Settings
