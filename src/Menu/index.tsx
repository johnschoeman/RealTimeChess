import React from "react"
import { View, StyleSheet, ImageBackground } from "react-native"

import Header from "../Header"
import GameModeList from "./GameModeList"

import { Spacing } from "../styles"
import { Images } from "../assets"

const MenuScreen = () => {
  return (
    <ImageBackground source={Images.Starry} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.gameModeListContainer}>
        <GameModeList />
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
  headerContainer: {
    height: "22%",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: Spacing.medium,
  },
  gameModeListContainer: {
    flex: 1,
    paddingTop: Spacing.large,
    paddingHorizontal: Spacing.small,
  },
})

export default MenuScreen
