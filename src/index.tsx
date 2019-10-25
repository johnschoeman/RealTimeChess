import React from "react"
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native"

import ArcadeScreen from "./Arcade"
import { ArcadeProvider } from "./ArcadeContext"

import { Color } from "./styles"

const GeneralStatusBar = () => (
  <View style={styles.statusBar}>
    <StatusBar
      translucent
      backgroundColor={Color.black}
      barStyle={"light-content"}
    />
  </View>
)

const RealTimeChess = () => {
  return (
    <View style={styles.outerContainer}>
      <GeneralStatusBar />
      <SafeAreaView style={styles.container}>
        <ArcadeProvider>
          <ArcadeScreen />
        </ArcadeProvider>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    backgroundColor: Color.black,
  },
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Color.black,
  },
})

export default RealTimeChess
