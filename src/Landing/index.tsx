import React from "react"
import {
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native"

import { Color, Spacing, Typography } from "../styles"

const LandingScreen = ({ navigation }: { navigation: any }) => (
  <ImageBackground
    source={require("../../assets/images/Welcome.png")}
    style={styles.container}
  >
    <View style={styles.footer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Game")}
          style={styles.button}
        >
          <Text style={Typography.mainButton}>PLAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.xLarge,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    backgroundColor: Color.white,
    height: Spacing.huge,
    borderRadius: Spacing.huge / 2,
    padding: Spacing.base,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    borderRadius: Spacing.huge / 2,
    elevation: 8,
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.darkGray,
  },
})

export default LandingScreen
