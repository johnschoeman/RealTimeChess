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

import { Colors } from "./styles"

const GeneralStatusBar = () => (
  <View style={styles.statusBar}>
    <StatusBar
      translucent
      backgroundColor={Colors.black}
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
    backgroundColor: Colors.black,
  },
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
})

export default RealTimeChess
