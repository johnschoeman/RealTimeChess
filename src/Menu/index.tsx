import React from "react"
import { View, StyleSheet } from "react-native"

import Header from "../Header"
import GameModeList from "./GameModeList"

import { Spacing } from "../styles"

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.gameModeListContainer}>
        <GameModeList />
      </View>
    </View>
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
    paddingHorizontal: Spacing.medium,
  },
})

export default MenuScreen
