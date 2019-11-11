import React, { useContext } from "react"
import { View, Text, StyleSheet } from "react-native"
import Slider from "@react-native-community/slider"

import ArcadeContext from "../ArcadeContext"

import { Typography } from "../styles"

const Settings = () => {
  const { setComputerClockSpeed, computerClockSpeed } = useContext(
    ArcadeContext
  )

  const handleOnValueChange = (value: number) => {
    setComputerClockSpeed(1100 - value * 100)
  }

  const sliderValue = (1100 - computerClockSpeed) / 100

  return (
    <View style={styles.container}>
      <Text style={styles.settingsText}>Settings</Text>
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    ...Typography.label,
  },
  slider: {
    width: "60%",
  },
})

export default Settings
