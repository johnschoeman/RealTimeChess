import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { Colors, Typography } from "../styles"

const Countdown = ({ count }: { count: number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{count >= 1 ? count : "GO!"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  heading: {
    color: Colors.yellow,
    fontSize: Typography.countFontSize,
    fontWeight: Typography.heavyFontWeight,
    shadowColor: Colors.red,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 10,
  },
})

export default Countdown
