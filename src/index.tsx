import React from "react"
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native"

import { GameProvider } from "./GameContext"
import AppNavigatorContainer from "./AppNavigatorContainer"

import { Color } from "./styles"

const GeneralStatusBar = () => (
  <View style={[styles.statusBar, { backgroundColor: Color.black }]}>
    <StatusBar
      translucent
      backgroundColor={Color.black}
      barStyle={"light-content"}
    />
  </View>
)

const RealTimeChess = () => {
  return (
    <View style={{ flex: 1 }}>
      <GeneralStatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <GameProvider>
          <AppNavigatorContainer />
        </GameProvider>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
  },
})

export default RealTimeChess
