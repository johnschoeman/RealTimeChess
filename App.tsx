import React from "react"
import { StyleSheet, View } from "react-native"

import RealTimeChess from "./src"

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RealTimeChess />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
})

export default App
