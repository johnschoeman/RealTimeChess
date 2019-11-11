import React, { useState, useContext } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"

import ArcadeContext from "../ArcadeContext"
import Settings from "./Settings"

import { Icons } from "../assets"
import { Typography, Colors } from "../styles"

interface GameContainerProps {
  title: string
  children: JSX.Element
}

const GameContainer = ({ title, children }: GameContainerProps) => {
  const { setGameIsActive } = useContext(ArcadeContext)
  const [showSettings, setShowSettings] = useState<boolean>(false)

  const handleOnPressSettings = () => setShowSettings(true)
  const handleOnBackdropPress = () => setShowSettings(false)
  const handleOnModalShow = () => setGameIsActive(false)
  const handleOnModalHide = () => setGameIsActive(true)

  return (
    <View style={styles.container} testID={"game"}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={Typography.header}>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleOnPressSettings}
        >
          <Icons.Settings style={{ backgroundColor: "white" }} />
        </TouchableOpacity>
      </View>
      <View style={styles.gameContainer}>{children}</View>
      <Modal
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={showSettings}
        onModalShow={handleOnModalShow}
        onModalHide={handleOnModalHide}
        onBackdropPress={handleOnBackdropPress}
      >
        <View style={styles.settingsContainer}>
          <Settings />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  titleContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  gameContainer: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  settingsContainer: {
    backgroundColor: Colors.transparentWhite,
    borderWidth: 2,
    borderRadius: 12,
  },
})

export default GameContainer
