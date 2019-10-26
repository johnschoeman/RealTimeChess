import React from "react"
import { View, StyleSheet, Image } from "react-native"

import { Images } from "./assets"

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        resizeMode="contain"
        source={Images.BoardHeader}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  headerImage: {
    flex: 1,
    width: undefined,
  },
})

export default Header
