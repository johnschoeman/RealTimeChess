import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import { Colors, Spacing } from "../../styles"
import { Images } from "../../assets"

interface HeartsProps {
  livesCount: number
}

const Hearts = ({ livesCount }: HeartsProps) => {
  return (
    <View style={styles.container}>
      <Image source={Images.Heart} />
      <Text style={styles.heartCount}>{livesCount}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heartCount: {
    color: Colors.white,
    padding: Spacing.base,
  },
})

export default Hearts
